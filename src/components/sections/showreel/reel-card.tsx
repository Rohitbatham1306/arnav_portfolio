"use client";

import { motion } from "framer-motion";
import type { showReelI } from "@/data/show-reel";
import { CARD_VARIANTS } from "./constants";
import { padIndex } from "./utils";
import { ScrambleText } from "./scramble-text";

interface ReelCardProps {
  item: showReelI;
  index: number;
  total: number;
  direction: number;
  isPlaying?: boolean;
  onTogglePlay: () => void;
}

/**
 * HUD-only overlay — title, watermark, navigation indicators.
 * Video playback is handled by a separate persistent layer in the parent
 * so iframes/videos are never destroyed on slide transitions.
 */
export function ReelCard({
  item,
  index,
  total,
  direction,
  onTogglePlay,
}: ReelCardProps) {
  return (
    <motion.div
      key={item.title}
      custom={direction}
      variants={CARD_VARIANTS}
      initial="enter"
      animate="active"
      exit="exit"
      className="absolute inset-0 z-10"
      onClick={onTogglePlay}
    >
      {/* Ghost index watermark */}
      <motion.span
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 0.04, x: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="pointer-events-none absolute bottom-0 right-6 select-none font-mono font-black leading-none text-white"
        style={{ fontSize: "clamp(100px, 16vw, 200px)", lineHeight: 0.85 }}
      >
        {padIndex(index)}
      </motion.span>

      {/* ── TOP HUD ── */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between px-4 pt-5 sm:px-8 md:px-14">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-mono text-[10px] font-semibold tracking-[0.4em] text-white/35 uppercase"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="font-mono text-lg sm:text-xl font-black uppercase tracking-tight text-white md:text-2xl"
          >
            Show Reel
          </motion.h2>
        </div>
      </div>

      {/* ── BOTTOM HUD ── */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-4 pb-20 sm:pb-14 md:px-14 pointer-events-none">
        <div className="flex max-w-xl flex-col gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">
            ✦ Project
          </span>
          <h3
            className="font-mono font-bold uppercase leading-tight tracking-wide text-white"
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.75rem)",
              textShadow: "0 2px 20px rgba(0,0,0,0.9)",
            }}
          >
            <ScrambleText
              text={item.title}
              trigger
            />
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
