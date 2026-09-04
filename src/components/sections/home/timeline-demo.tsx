"use client";

import React, { useRef, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { FeatureCard } from "./features";
import PhraseAnimation from "@/components/common/phrase-reveal";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerCardProps {
  src: string;
  title: string;
  aspect?: string;
  className?: string;
}

const VideoPlayerCard: React.FC<VideoPlayerCardProps> = ({
  src,
  title,
  aspect = "aspect-[16/10]",
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Set default audio volume to 40% across all systems
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.4;
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.volume = 0.4;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    videoRef.current.volume = 0.4;
    setIsMuted(nextMuted);
  };

  return (
    <FeatureCard
      className={`group relative p-0 overflow-hidden w-full bg-black rounded-xl border border-white/10 hover:border-white/20 transition-colors cursor-pointer ${className}`}
    >
      <div
        onClick={togglePlay}
        className={`relative w-full ${aspect} overflow-hidden bg-neutral-950 select-none`}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedMetadata={(e) => {
            e.currentTarget.volume = 0.4;
          }}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Play/Pause state center indicator overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity pointer-events-none">
            <div className="p-3.5 rounded-full bg-white/20 border border-white/30 text-white">
              <Play size={24} className="translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Title and control bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-center justify-between z-10">
          <span className="font-mono text-xs font-semibold text-white/90 truncate tracking-wide">
            {title}
          </span>
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-red-400 animate-pulse" />}
            </button>
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
        </div>
      </div>
    </FeatureCard>
  );
};

interface ImageCardProps {
  src: string;
  title: string;
  aspect?: string;
  className?: string;
  imgClassName?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  title,
  aspect = "aspect-[16/10]",
  className = "",
  imgClassName = "",
}) => {
  return (
    <FeatureCard className={`group relative p-0 overflow-hidden w-full bg-black rounded-xl border border-white/10 hover:border-white/20 transition-colors ${className}`}>
      <div className={`relative w-full ${aspect} overflow-hidden bg-neutral-950`}>
        <img
          src={src}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imgClassName}`}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Title bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-center justify-between z-10">
          <span className="font-mono text-xs font-semibold text-white/90 truncate tracking-wide">
            {title}
          </span>
        </div>
      </div>
    </FeatureCard>
  );
};

export function TimelineDemo() {
  const data = [
    {
      title: "01. AI Creative Direction ⭐",
      content: (
        <div>
          <h3 className="text-sm font-normal text-neutral-800 md:text-3xl dark:text-neutral-200">
            <PhraseAnimation phrase="Generative AI Films & Visual Storytelling" />
          </h3>
          <p className="mb-6 text-xs text-muted-foreground md:text-base mt-1.5 font-mono">
            <PhraseAnimation phrase="generative ai • ai films • ai commercials • ai visuals • ai storytelling" />
          </p>
          <div className="mx-auto grid gap-4 grid-cols-1 lg:grid-cols-2">
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/4%20(1).mp4"
              title="AI Creative Direction 01"
              aspect="aspect-[16/10]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/5%20(1).mp4"
              title="AI Creative Direction 02"
              aspect="aspect-[16/10]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/6%20(1).mp4"
              title="AI Creative Direction 03"
              aspect="aspect-[16/10]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/3%20(1).MP4"
              title="AI Creative Direction 04"
              aspect="aspect-[16/10]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "02. Creative & Advertising",
      content: (
        <div>
          <h3 className="text-sm font-normal text-neutral-800 md:text-3xl dark:text-neutral-200">
            <PhraseAnimation phrase="Brand Concepts & Visual Communication" />
          </h3>
          <p className="mb-6 text-xs text-muted-foreground md:text-base mt-1.5 font-mono">
            <PhraseAnimation phrase="campaigns • art direction • brand concepts • creative strategy • visual communication" />
          </p>
          <div className="mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/BANANA%20(1).mp4"
              title="Banana AI Concept 01"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/BANANA%20(2).mp4"
              title="Banana AI Concept 02"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/BANANA.mp4"
              title="Banana Viral 3D Reel"
              aspect="aspect-[9/16]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "03. Mentorship & Training",
      content: (
        <div>
          <h3 className="text-sm font-normal text-neutral-800 md:text-3xl dark:text-neutral-200">
            <PhraseAnimation phrase="Mentorship & Training" />
          </h3>
          <p className="mb-6 text-xs text-muted-foreground md:text-base mt-1.5 font-mono">
            <PhraseAnimation phrase="Mentorship • Workshops • Training" />
          </p>
          <div className="mx-auto grid gap-4 grid-cols-1 lg:grid-cols-2">
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Mentorship-20260903T164100Z-1-001/Mentorship/1.jpeg"
              title="Mentorship Session 01"
              aspect="aspect-[16/10]"
            />
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Mentorship-20260903T164100Z-1-001/Mentorship/2.jpeg"
              title="Mentorship Session 02"
              aspect="aspect-[16/10]"
            />
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Mentorship-20260903T164100Z-1-001/Mentorship/3.jpeg"
              title="Workshop & Training 03"
              aspect="aspect-[16/10]"
            />
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Mentorship-20260903T164100Z-1-001/Mentorship/5.jpeg"
              title="AI Masterclass 04"
              aspect="aspect-[16/10]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "04. Production Work",
      content: (
        <div>
          <h3 className="text-sm font-normal text-neutral-800 md:text-3xl dark:text-neutral-200">
            <PhraseAnimation phrase="Commercials, 3D Editing & Brand Films" />
          </h3>
          <p className="mb-6 text-xs text-muted-foreground md:text-base mt-1.5 font-mono">
            <PhraseAnimation phrase="commercials • brand films • video production • photography • editing • 3d" />
          </p>
          <div className="mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl">
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/1.jpeg"
              title="Production Visual Concept 01"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/2.mp4"
              title="Production Reel 02"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/3.mp4"
              title="Production Reel 03"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/4.mp4"
              title="Production Showcase 04"
              aspect="aspect-[9/16]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "05. Tech Help",
      content: (
        <div>
          <h3 className="text-sm font-normal text-neutral-800 md:text-3xl dark:text-neutral-200">
            <PhraseAnimation phrase="Tech Help & Creative Tech Solutions" />
          </h3>
          <p className="mb-6 text-xs text-muted-foreground md:text-base mt-1.5 font-mono">
            <PhraseAnimation phrase="tech support • creative tech • digital workflows • automation • technical guidance" />
          </p>
          <div className="mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl">
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/techhelp/1.jpeg"
              title="Tech Help Visual 01"
              aspect="aspect-[9/16]"
            />
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/techhelp/2.jpeg"
              title="Tech Help Visual 02"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/techhelp/3%20(2).mp4"
              title="Tech Help Demo 03"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/techhelp/4%20(2).mp4"
              title="Tech Help Showcase 04"
              aspect="aspect-[9/16]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "06. Awards & Recognition",
      content: (
        <div>
          <h3 className="text-sm font-normal text-neutral-800 md:text-3xl dark:text-neutral-200">
            <PhraseAnimation phrase="Awards & Recognition" />
          </h3>
          <p className="mb-6 text-xs text-muted-foreground md:text-base mt-1.5 font-mono">
            <PhraseAnimation phrase="ai workflows • marketing automation • digital experiences • creative-tech solutions" />
          </p>
          <div className="mx-auto grid gap-4 grid-cols-1 lg:grid-cols-2">
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/techhelp/IMG_2442.PNG"
              title="Award Felicitation & Industry Honor"
              aspect="aspect-[9/16]"
              imgClassName="object-top"
            />
            <ImageCard
              src="/awards/IMG_9386.webp"
              title="Digitopia Keynote & Recognition Session"
              aspect="aspect-[9/16]"
              imgClassName="object-center"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip mt-10">
      <Timeline data={data} />
    </div>
  );
}
