"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AboutMe from "@/components/sections/about/about-me";
// import CalBooking from "@/components/sections/home/cal-booking";
import Testimonials from "@/components/sections/home/testimonials";
import { TimelineDemo } from "@/components/sections/home/timeline-demo";
import Preloader from "@/components/common/preloader";
import ShowReel from "@/components/sections/showreel";
import CollabSec from "@/components/sections/home/collab-section";
import AboutScrollSection from "@/components/sections/about/about-scroll-section";

export default function Home() {
  // The Preloader owns the (60fps) load-progress state internally so those
  // updates never re-render this heavy page tree. It just tells us when it's
  // done, and we drop it.
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
    document.body.style.cursor = "default";
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center scroll-smooth">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handleLoaded} />}
      </AnimatePresence>

      {/*About Me is Hero Section */}
      <section id="hero" className="w-full scroll-mt-24">
        <AboutMe />
      </section>
      <ShowReel />

      {/* About Section */}
      <section id="about" className="w-full scroll-mt-24">
        <AboutScrollSection />
      </section>

      {/* <div className="w-full scroll-mt-24" id="services">
        <LogoCloud />
      </div> */}

      {/* Services Section */}
      {/* <section id="services" className="w-full scroll-mt-24">
        <ServicesMenu />
      </section> */}

      {/* Timeline & Testimonials */}
      {/* Projects Section */}
      <section id="projects" className="w-full scroll-mt-24">
        {/* <ViralShowcase /> */}
        <TimelineDemo />
      </section>
      <CollabSec />

      <Testimonials />
      {/* Contact Section — Book Time (Cal.com) commented out */}
      {/* <section id="contact" className="w-full scroll-mt-24">
        <CalBooking />
      </section> */}

      {/* WhatsApp CTA */}
      <section id="contact" className="w-full scroll-mt-24 py-16 md:py-24 flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Get In Touch</p>
        <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-center">
          Let&apos;s Make Something
          <span className="block text-primary">Awesome Together</span>
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Drop a WhatsApp message and let&apos;s talk about your project.
        </p>
        <a
          href="https://wa.me/918770794033"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-green-500 hover:bg-green-400 text-white font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-green-500/30 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp: +91 877 079 4033
        </a>
        <a
          href="mailto:arnav49@gmail.com"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          or email arnav49@gmail.com
        </a>
      </section>
    </div>
  );
}
