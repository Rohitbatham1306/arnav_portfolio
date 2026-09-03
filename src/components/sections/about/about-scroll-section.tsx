"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// oklch(59.71% 0.23 23.86) ≈ #c93a2a — site-wide red accent
const redColor = "oklch(59.71% 0.23 23.86)";

const AboutScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#060608] py-20 lg:py-28 flex items-center select-none"
    >
      {/* ── FULL-BLEED BACKGROUND IMAGE (THE ARTWORK BANNER) ── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="/portfolio/image-2.png"
            alt="About Section Background Artwork"
            fill
            priority
            quality={95}
            className="object-cover object-center lg:object-[75%_center] opacity-90"
            sizes="100vw"
          />
        </motion.div>

        {/* Soft edge gradient overlay on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent pointer-events-none w-full md:w-4/5 lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608]/80 pointer-events-none" />
      </div>

      {/* ── BACKGROUND ATMOSPHERE & NOISE ── */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.035] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Ambient Red Glow Bloom */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(201, 58, 42, 0.5) 0%, transparent 70%)",
        }}
      />

      {/* ── CONTENT OVERLAY (SLIDES IN SLOWLY FROM LEFT WHEN SCROLLING DOWN, DOES NOT REVERSE) ── */}
      <div className="relative z-20 w-full px-6 sm:px-12 lg:pl-20 lg:pr-12 max-w-xl lg:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 1.2,
            delay: 0.35, // Background artwork displays first, then left text slowly animates in
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-start text-left"
        >
          {/* Tag */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Mono', monospace",
              color: redColor,
            }}
            className="mb-4 text-[10px] uppercase tracking-[0.3em] md:text-xs"
          >
            ✦ ABOUT ME ✦
          </motion.p>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          >
            I&apos;d rather let the{" "}
            <span
              className="font-normal italic"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                color: redColor,
              }}
            >
              work
            </span>{" "}
            do the talking.
          </motion.h2>

          {/* Bio description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-sm leading-relaxed text-white/85 sm:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Gen AI Art Director + Marketing + Event Production + Technology.
            Transforming brand narratives into cinematic experiences,
            high-engagement visuals, and next-generation automated workflows. Built
            on one simple rule: quality over quantity, always.
          </motion.p>

          {/* Accent divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 h-px w-24 origin-left"
            style={{
              backgroundImage: `linear-gradient(to right, ${redColor}, transparent)`,
            }}
          />

          {/* Discipline chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 flex flex-wrap items-center gap-2.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          >
            {[
              "AI CREATIVE DIRECTION",
              "CREATIVE & ADVERTISING",
              "SOCIAL & INFLUENCER",
              "FILM & PRODUCTION",
              "EXPERIENTIAL",
              "CREATIVE TECH",
            ].map((discipline, i) => (
              <span
                key={discipline}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/75"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {i !== 0 && (
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: redColor }}
                  />
                )}
                {discipline}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          >
            <span
              className="text-xs uppercase tracking-[0.25em] text-white/90"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              HAPPY TO COLLABORATE
            </span>{" "}
            <span style={{ color: redColor }}>✦</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutScrollSection;
