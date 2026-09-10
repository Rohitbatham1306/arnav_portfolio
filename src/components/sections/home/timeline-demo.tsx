"use client";

import React, { useRef, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { FeatureCard } from "./features";
import PhraseAnimation from "@/components/common/phrase-reveal";
interface VideoPlayerCardProps {
  src: string;
  title: string;
  points?: string[];
  aspect?: string;
  className?: string;
}

interface ImageCardProps {
  src: string;
  title: string;
  points?: string[];
  aspect?: string;
  className?: string;
  imgClassName?: string;
}

const CardTitleContent: React.FC<{ title: string; points?: string[] }> = ({
  title,
  points,
}) => {
  if (points && points.length > 0) {
    return (
      <div className="flex flex-col gap-1.5">
        <h4 className="font-semibold text-xs sm:text-sm text-white leading-tight drop-shadow-md tracking-tight">
          {title}
        </h4>
        <ul className="flex flex-col gap-1">
          {points.map((pt, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-[10px] sm:text-[11px] font-mono text-white/80 leading-tight"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (title.includes("\n")) {
    const [heading, ...rest] = title.split("\n");
    const subpoints = rest
      .join(" • ")
      .split("•")
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <div className="flex flex-col gap-1.5">
        <h4 className="font-semibold text-xs sm:text-sm text-white leading-tight drop-shadow-md tracking-tight">
          {heading.trim()}
        </h4>
        {subpoints.length > 0 && (
          <ul className="flex flex-col gap-1">
            {subpoints.map((pt, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[10px] sm:text-[11px] font-mono text-white/80 leading-tight"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <p className="font-mono text-xs font-semibold text-white/95 whitespace-pre-line break-words leading-snug tracking-wide drop-shadow-md">
      {title}
    </p>
  );
};

const VideoPlayerCard: React.FC<VideoPlayerCardProps> = ({
  src,
  title,
  points,
  aspect = "aspect-[16/10]",
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <FeatureCard
      className={`group relative p-0 overflow-hidden w-full bg-black rounded-xl border border-white/10 hover:border-white/20 transition-colors ${className}`}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full ${aspect} overflow-hidden bg-neutral-950 select-none`}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          onLoadedMetadata={(e) => {
            e.currentTarget.volume = 0.2;
          }}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

        {/* Title bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-10 pointer-events-none">
          <CardTitleContent title={title} points={points} />
        </div>
      </div>
    </FeatureCard>
  );
};

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  title,
  points,
  aspect = "aspect-[16/10]",
  className = "",
  imgClassName = "",
}) => {
  return (
    <FeatureCard className={`group relative p-0 overflow-hidden w-full bg-black rounded-xl border border-white/10 hover:border-white/20 transition-colors ${className}`}>
      <div className={`relative w-full ${aspect} overflow-hidden bg-neutral-950`}>
        <img
          src={src}
          alt={typeof title === "string" ? title : "Card image"}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imgClassName}`}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

        {/* Title bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-10">
          <CardTitleContent title={title} points={points} />
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
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/1%20(1).MP4"
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
          <div className="mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/BANANA%20(1).mp4"
              title="Banana AI Concept 01"
              aspect="aspect-[4/5]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/BANANA%20(2).mp4"
              title="Banana AI Concept 02"
              aspect="aspect-[4/5]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/BANANA.mp4"
              title="Banana Viral 3D Reel"
              aspect="aspect-[4/5]"
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
              title="Christ University Students"
              points={["Industry Mentorship", "Career Guidance"]}
              aspect="aspect-[16/10]"
            />
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Mentorship-20260903T164100Z-1-001/Mentorship/2.jpeg"
              title="Woxsen & Loyola Students"
              points={["Creative & AI Industry Interaction"]}
              aspect="aspect-[16/10]"
            />
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Mentorship-20260903T164100Z-1-001/Mentorship/3.jpeg"
              title="Manipal University Students"
              points={["Generative AI & Creative Workshop"]}
              aspect="aspect-[16/10]"
            />
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Mentorship-20260903T164100Z-1-001/Mentorship/5.jpeg"
              title="Smart Mall Prototype"
              points={["AI-Powered Smart Mall Experience"]}
              aspect="aspect-[16/10]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "04. Videography works",
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
              title="Script Production"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/2.mp4"
              title="Testimonial Shoots"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/3.mp4"
              title="Real Estate Shoots"
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/4.mp4"
              title="School Brochure Shoots"
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
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Service%20now%20Tech%20Support.mp4"
              title="Technical Execution & Client Experience"
              points={[
                "Technical Testing",
                "Material Sourcing",
                "Installation Support",
              ]}
              aspect="aspect-[9/16]"
            />
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/techhelp/2.jpeg"
              title="IPL-Inspired Interactive Game"
              points={[
                "Creative Direction",
                "Mall Activation",
              ]}
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/techhelp/3%20(2).mp4"
              title="Interactive Brand Game"
              points={[
                "Creative-Tech Collaboration",
                "Game Experience",
              ]}
              aspect="aspect-[9/16]"
            />
            <VideoPlayerCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/techhelp/4%20(2).mp4"
              title="Technical Testing & Experience Support"
              points={[
                "Technical Testing",
                "Tech-Team Collaboration",
                "Interactive Experience",
              ]}
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
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Certificate%20Presentation%20Group%20Photo.png"
              title="3rd Place | GenAI Micro-Film Hackathon"
              points={["Hyderabad", "25+ Film Entries"]}
              aspect="aspect-[9/16]"
              imgClassName="object-top"
            />
            <ImageCard
              src="https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/WhatsApp%20Image%202026-09-07%20at%2015.15.11.jpeg"
              title="Logo Design & Concept Recognition"
              points={["Brand Identity", "Creative Concept"]}
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
