"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { showRealData, type showReelI } from "@/data/show-reel";
import { Grain } from "./grain";
import { ReelCard } from "./reel-card";

/**
 * Persistent Video backdrop for a single slide.
 * Mounted once and never destroyed — only opacity toggles.
 */
function VimeoBackdrop({
  item,
  isActive,
  isPlaying,
  mountVideo,
  isMuted,
  onVideoEnded,
}: {
  item: showReelI;
  isActive: boolean;
  isPlaying: boolean;
  mountVideo: boolean;
  isMuted: boolean;
  onVideoEnded?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Strictly control audio & playback state for active vs inactive slides and play/pause
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = 0.4;

    if (isActive) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = 0.4;

      if (isPlaying) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If browser blocked unmuted autoplay on load, fallback to muted autoplay
            if (videoRef.current && !videoRef.current.muted) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          });
        }
      } else {
        videoRef.current.pause();
      }
    } else {
      // Inactive slide: pause playback and mute audio immediately
      videoRef.current.pause();
      videoRef.current.muted = true;
    }
  }, [isActive, isPlaying, isMuted]);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: isActive ? 2 : 1,
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.7s ease-in-out",
      }}
    >
      {/* Thumbnail fallback — visible instantly */}
      <img
        src={item.thumbnail}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Direct HTML5 Video player with audio support strictly on active slide */}
      {mountVideo && item.videoUrl && (
        <video
          ref={videoRef}
          src={item.videoUrl}
          playsInline
          loop
          muted={!isActive || isMuted}
          onLoadedMetadata={(e) => {
            e.currentTarget.volume = 0.4;
          }}
          onEnded={() => {
            if (isActive && onVideoEnded) {
              onVideoEnded();
            }
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {mountVideo && !item.videoUrl && item.vimeoId && item.vimeoId !== "000000000" && (
        <iframe
          src={`https://player.vimeo.com/video/${item.vimeoId}?background=1&autoplay=${isActive && isPlaying ? 1 : 0}&loop=1&muted=${isActive && !isMuted ? 0 : 1}&dnt=1`}
          loading="lazy"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "max(100%, 177.78vh)",
            height: "max(100%, 56.25vw)",
            transform: "translate(-50%, -50%)",
            border: 0,
          }}
          allow="autoplay; fullscreen"
          title={item.title}
        />
      )}

      {/* Cinematic grade overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/50" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/20" />
    </div>
  );
}

export default function ShowReel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [locked, setLocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Live sound enabled by default

  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const total = showRealData.length;

  // Detect touch / coarse-pointer devices → hide the custom play cursor
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Unmute on first user gesture if browser blocked unmuted autoplay initially
  useEffect(() => {
    const handleGesture = () => {
      setIsMuted(false);
    };
    window.addEventListener("click", handleGesture, { once: true });
    window.addEventListener("touchstart", handleGesture, { once: true });
    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
    };
  }, []);

  // Which slide indices should have their iframes mounted (current + adjacent)
  const mountedIndices = useMemo(() => {
    const set = new Set<number>();
    set.add(active);
    set.add((active + 1) % total);
    set.add((active - 1 + total) % total);
    return set;
  }, [active, total]);

  // Cursor spring
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  const navigate = useCallback(
    (step: number) => {
      if (locked) return;
      const next = (active + step + total) % total;
      setDir(step);
      setActive(next);
      setIsPlaying(true);
      setLocked(true);
      if (lockTimer.current) clearTimeout(lockTimer.current);
      lockTimer.current = setTimeout(() => setLocked(false), 700);
    },
    [active, locked, total],
  );

  // Auto-advance to next video when full length video finishes
  const handleVideoEnded = useCallback(() => {
    setDir(1);
    setActive((prev) => (prev + 1) % total);
    setIsPlaying(true);
  }, [total]);

  // Toggle inline play/pause
  const togglePlay = useCallback(() => {
    if (suppressClick.current) return;
    setIsPlaying((prev) => !prev);
  }, []);

  // Drag / swipe to move to the previous or next reel
  const handleDragStart = useCallback(
    (e: React.PointerEvent) => {
      suppressClick.current = false;
      dragStart.current = { x: e.clientX, y: e.clientY };
    },
    [],
  );

  const handleDragEnd = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current = null;

      const SWIPE_THRESHOLD = 50;
      // Horizontal swipe wins → drag left = next, drag right = previous
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
        suppressClick.current = true; // don't toggle play on swipe
        navigate(dx < 0 ? 1 : -1);
      }
    },
    [navigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") navigate(-1);
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <>
      <Grain />

      <section
        className={`relative h-dvh md:h-screen w-full select-none overflow-hidden bg-black ${
          isTouch ? "cursor-auto" : "cursor-none"
        }`}
        style={{ touchAction: "pan-y" }}
        aria-label="Show Reel"
        onPointerDown={handleDragStart}
        onPointerUp={handleDragEnd}
        onMouseMove={(e) => {
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
        }}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
      >
        {/* ── SOUND TOGGLE BUTTON (TOP RIGHT HUD) ── */}
        <div className="absolute top-7 right-8 md:right-14 z-30 flex items-center gap-3">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted((prev) => !prev);
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white/15 cursor-pointer select-none"
          >
            {isMuted ? (
              <>
                <VolumeX size={15} className="text-white/60" />
                <span className="font-mono text-[10px] font-semibold tracking-wider text-white/60 uppercase">
                  Sound Off
                </span>
              </>
            ) : (
              <>
                <Volume2 size={15} className="text-red-500 animate-pulse" />
                <span className="font-mono text-[10px] font-semibold tracking-wider text-white uppercase">
                  Sound On
                </span>
              </>
            )}
          </motion.button>
        </div>

        {/* ── PERSISTENT VIDEO BACKDROPS ── */}
        {showRealData.map((item, i) => {
          if (!mountedIndices.has(i)) return null;
          const mountVideo = isTouch ? i === active : true;
          return (
            <VimeoBackdrop
              key={`backdrop-${i}`}
              item={item}
              isActive={i === active}
              isPlaying={isPlaying}
              mountVideo={mountVideo}
              isMuted={isMuted}
              onVideoEnded={handleVideoEnded}
            />
          );
        })}

        {/* Custom play/pause cursor — desktop / fine-pointer only */}
        {!isTouch && (
          <motion.div
            style={{ x: springX, y: springY }}
            animate={{
              opacity: cursorVisible ? 1 : 0,
              scale: cursorVisible ? 1 : 0.5,
            }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="pointer-events-none fixed left-0 top-0 z-9998 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm shadow-2xl"
          >
            {isPlaying ? (
              <Pause size={18} className="text-white fill-white" />
            ) : (
              <Play size={18} className="text-white fill-white translate-x-0.5" />
            )}
          </motion.div>
        )}

        {/* Big subtle Center Play Indicator overlay when paused */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
              onClick={togglePlay}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer"
            >
              <div className="flex size-20 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md shadow-2xl transition hover:scale-110">
                <Play size={32} className="translate-x-0.5 fill-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-bleed HUD */}
        <AnimatePresence custom={dir} mode="wait">
          <ReelCard
            key={active}
            item={showRealData[active]}
            index={active}
            total={total}
            direction={dir}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
          />
        </AnimatePresence>

        {/* Prev / Next + dot navigation */}
        <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-white/15 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </motion.button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <motion.button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (i !== active) {
                    setDir(i > active ? 1 : -1);
                    setActive(i);
                    setIsPlaying(true);
                  }
                }}
                animate={{
                  width: i === active ? 20 : 6,
                  opacity: i === active ? 1 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-1.5 rounded-full bg-white cursor-pointer"
              />
            ))}
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-white/15 cursor-pointer"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        <AnimatePresence>
          {active === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] font-semibold tracking-[0.4em] text-white/25 uppercase"
            >
              Scroll to Explore ↓
            </motion.p>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
