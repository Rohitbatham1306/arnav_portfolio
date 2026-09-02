"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative h-dvh md:h-screen w-full overflow-hidden flex flex-col justify-between"
    >
      {/* ── Background Banner Image ── */}
      <motion.div
        style={{
          y: yBg,
          scale: scaleBg,
        }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <Image
          src="/portfolio/banner-1.png"
          alt="Banner Background"
          fill
          priority
          quality={95}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle Dark Gradients for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
      </motion.div>

      {/* Background Noise Texture for Awwwards feel */}
      <div className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Ambient Red Glow */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-primary/20 blur-[120px] pointer-events-none z-10" />

      {/* Empty space for top navbar */}
      <div className="relative z-20 w-full pt-20" />

      {/* Mobile: Vertical Side Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 z-30 text-foreground"
      >
        <div className="flex items-center gap-4 [writing-mode:vertical-rl] rotate-180 bg-black/40 backdrop-blur-md py-4 px-2 rounded-full border border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">
            Featured Work
          </span>
          <span className="w-1 h-1 bg-foreground rounded-full" />
          <span className="text-xs font-bold">Creative Direction</span>
          <span className="w-1 h-1 bg-foreground rounded-full" />
          <span className="text-xs font-bold">AI & Marketing</span>
          <span className="w-1 h-1 bg-foreground rounded-full" />
          <span className="text-xs font-bold">Production & Tech</span>
        </div>
      </motion.div>

      {/* Bottom Info Strip (desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="hidden md:flex relative z-30 w-full px-10 pb-10 flex-row justify-between items-center text-foreground"
      >
        <div className="flex flex-col gap-2 bg-black/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg">
          <p className="text-xs font-mono uppercase text-gray-400">
            Featured Work
          </p>
          <div className="flex items-center gap-4 text-sm font-bold">
            <span className="hover:text-primary transition-colors cursor-pointer">
              Creative Direction
            </span>
            <span className="w-1 h-1 bg-foreground rounded-full" />
            <span className="hover:text-primary transition-colors cursor-pointer">
              AI & Marketing
            </span>
            <span className="w-1 h-1 bg-foreground rounded-full" />
            <span className="hover:text-primary transition-colors cursor-pointer">
              Production & Technology
            </span>
          </div>
        </div>

        <div className="hidden md:block bg-black/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg">
          <p className="text-xs font-mono text-right text-gray-400">
            Social
          </p>
          <div className="flex items-center gap-4 text-sm font-bold">
            <Link
              href={"https://www.instagram.com/iamfreakazo/"}
              target="_blank"
            >
              <span className="hover:text-primary transition-colors cursor-pointer">
                Instagram
              </span>
            </Link>
            <span className="w-1 h-1 bg-foreground rounded-full" />
            <Link
              href={"https://www.linkedin.com/in/arnav-roy-05337b187/"}
              target="_blank"
            >
              <span className="hover:text-primary transition-colors cursor-pointer">
                LinkedIn
              </span>
            </Link>
            <span className="w-1 h-1 bg-foreground rounded-full" />
            <Link
              href={"https://youtube.com/@arnavroy1586?si=KSgajk8q3kQijOY3"}
              target="_blank"
            >
              <span className="hover:text-primary transition-colors cursor-pointer">
                YouTube
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
