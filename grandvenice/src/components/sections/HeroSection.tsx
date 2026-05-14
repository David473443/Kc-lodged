"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { HotelInfo } from "@/types";

interface HeroSectionProps {
  hotelInfo?: HotelInfo | null;
}

export function HeroSection({ hotelInfo }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (videoRef.current) {
      tl.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
    }
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=1"
    );
    tl.fromTo(
      scriptRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.3"
    );
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    );
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.3"
    );
  }, []);

  const videoSrc = hotelInfo?.heroVideoUrl || "/video/hero-video.mp4";

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        poster="/images/hero-poster.jpg"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Emerald accent line top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          ref={scriptRef}
          className="font-script text-gold text-3xl md:text-4xl mb-3 opacity-0"
        >
          Welcome to
        </p>

        <h1
          ref={headlineRef}
          className="font-serif font-light text-white text-5xl md:text-7xl lg:text-8xl leading-tight tracking-wide mb-6 opacity-0"
        >
          GrandVenice
          <br />
          <span className="italic font-light">Hotel & Suites</span>
        </h1>

        <p
          ref={subRef}
          className="text-white/75 text-base md:text-lg tracking-wider max-w-lg mx-auto mb-10 opacity-0"
        >
          {hotelInfo?.heroSubtext ||
            "Port Harcourt's Premier Luxury Destination · Rivers State, Nigeria"}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
        >
          <Button variant="gold" size="lg" href="/booking">
            Reserve Your Stay
          </Button>
          <Button variant="ghost-white" size="lg" href="#rooms">
            Explore Rooms
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <ChevronDown
          size={20}
          className="text-gold animate-[pulseDot_2s_ease-in-out_infinite]"
        />
      </div>
    </section>
  );
}
