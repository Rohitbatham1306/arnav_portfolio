"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Layers } from "lucide-react";

// oklch(59.71% 0.23 23.86) ≈ #c93a2a — site-wide red accent
const redColor = "oklch(59.71% 0.23 23.86)";

const AboutScrollSection = () => {
  const panelRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Parallax on the artwork panel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, 90]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, 90]), springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = panelRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      id="about-section"
      className="relative min-h-screen w-full overflow-hidden bg-[#060608] py-20 lg:py-28 flex items-center justify-center select-none"
    >
      {/* ── FULL-BLEED BACKGROUND IMAGE (ACROSS ENTIRE 100% WIDTH) ── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/bg/1.png"
          alt="About Section Full Background"
          fill
          priority
          quality={95}
          className="object-cover object-center opacity-45 scale-105"
          sizes="100vw"
        />
        {/* Full-width gradient overlays for readability and cinematic atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />
      </div>

      {/* ── BACKGROUND ATMOSPHERE & NOISE ── */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.035] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Ambient Red Glow Bloom */}
      <div
        className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 z-10"
        style={{
          background: "radial-gradient(circle, rgba(201, 58, 42, 0.5) 0%, rgba(10, 10, 20, 0.8) 60%, transparent 80%)",
        }}
      />

      <div className="relative z-20 container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ══════════ LEFT COLUMN: ABOUT ME CARD (REVEALS AFTER ~1.8s) ══════════ */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1.1,
                delay: 1.8, // 1.8s delay: reveals after image has appeared
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative p-7 sm:p-10 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
            >
              {/* Precision Corner Brackets */}
              <div
                className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.7)" }}
              />
              <div
                className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.7)" }}
              />
              <div
                className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.7)" }}
              />
              <div
                className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.7)" }}
              />

              {/* Tag */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.9 }}
                className="mb-4 text-[10px] uppercase tracking-[0.3em] md:text-xs"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: redColor,
                }}
              >
                ✦ About Me ✦
              </motion.p>

              {/* Main Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 2.0 }}
                className="mb-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] text-white"
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
                transition={{ duration: 0.7, delay: 2.15 }}
                className="mb-6 text-sm leading-relaxed text-white/70 sm:text-base"
              >
                Gen AI Art Director + Marketing + Event Production + Technology.
                Transforming brand narratives into cinematic experiences, high-engagement
                visuals, and next-generation automated workflows. Built on one simple rule:
                quality over quantity, always.
              </motion.p>

              {/* Accent divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 2.25 }}
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
                transition={{ duration: 0.7, delay: 2.35 }}
                className="mb-7 flex flex-wrap items-center gap-2.5"
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
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/60"
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
                transition={{ duration: 0.6, delay: 2.5 }}
              >
                <span
                  className="text-xs uppercase tracking-[0.25em] text-white/90"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Happy to collaborate
                </span>{" "}
                <span style={{ color: redColor }}>✦</span>
              </motion.p>
            </motion.div>
          </div>

          {/* ══════════ RIGHT COLUMN: CINEMATIC 3D ARTWORK PANEL (IMAGE 2 - SHOWS FIRST) ══════════ */}
          <div
            ref={panelRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 flex flex-col items-center justify-center relative order-1 lg:order-2"
            style={{ perspective: "1300px" }}
          >
            {/* Outer 3D Perspective Card (Clean, borderless padding removed) */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              initial={{
                opacity: 0,
                scale: 0.86,
                rotateY: 12,
                rotateX: -5,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                y: 0,
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1.6,
                delay: 0.2, // Image 2 animates in FIRST
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative w-full aspect-[16/10] max-h-[580px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95)] border border-white/10 bg-black cursor-pointer"
            >
              {/* Dynamic Glare Specular Highlight Reflection */}
              <motion.div
                className="pointer-events-none absolute -inset-[100%] z-30 opacity-30 mix-blend-overlay transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                }}
              />

              {/* Full Image Artwork */}
              <div className="relative w-full h-full overflow-hidden bg-black">
                <Image
                  src="/portfolio/image-2.png"
                  alt="Arnav Artwork - Visual Architecture"
                  fill
                  priority
                  quality={95}
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />

                {/* Cinematic Depth & Lighting Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35 z-10 pointer-events-none" />

                {/* Corner Studio Crosshair Marks */}
                <div className="pointer-events-none absolute top-3 left-3 size-4 border-t-2 border-l-2 border-white/40 z-30" />
                <div className="pointer-events-none absolute top-3 right-3 size-4 border-t-2 border-r-2 border-white/40 z-30" />
                <div className="pointer-events-none absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-white/40 z-30" />
                <div className="pointer-events-none absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-white/40 z-30" />

                {/* Artwork Metadata In-Panel Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-7 flex items-end justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/15 text-white">
                        FEATURED KEY VISUAL
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                        02. Creative & Advertising
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                      Visual Architecture & Direction
                    </h3>
                  </div>

                  {/* 3D Depth pill indicator */}
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-widest text-white/70">
                    <Layers className="size-3 text-red-400" />
                    <span>3D Viewport</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Ambient Floor Shadow & Red Reflected Light */}
            <div
              className="pointer-events-none -mt-6 w-4/5 h-14 rounded-full blur-2xl opacity-60 transition-opacity duration-700"
              style={{
                background: "radial-gradient(ellipse at center, rgba(201, 58, 42, 0.4) 0%, rgba(0,0,0,0.85) 70%, transparent 100%)",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutScrollSection;
