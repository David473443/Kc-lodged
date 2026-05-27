"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";
import { Button } from "@/components/ui/Button";
import type { HotelInfo } from "@/types";

interface HeroSectionProps {
  hotelInfo?: HotelInfo | null;
}

export function HeroSection({ hotelInfo }: HeroSectionProps) {
  const imgRef      = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLSpanElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const barLeftRef  = useRef<HTMLDivElement>(null);
  const barRightRef = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split headline into individual characters for staggered animation
      const split1 = line1Ref.current
        ? new SplitType(line1Ref.current, { types: "chars,words" })
        : null;
      const split2 = line2Ref.current
        ? new SplitType(line2Ref.current, { types: "chars,words" })
        : null;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(imgRef.current,     { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 2 })
        .fromTo(overlayRef.current,  { opacity: 0 }, { opacity: 1, duration: 1.2 }, "-=1.6")
        .fromTo(barLeftRef.current,  { scaleX: 0, transformOrigin: "left" },  { scaleX: 1, duration: 1 }, "-=0.6")
        .fromTo(barRightRef.current, { scaleX: 0, transformOrigin: "right" }, { scaleX: 1, duration: 1 }, "<")
        .fromTo(taglineRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.4");

      // Character-by-character headline reveal
      if (split1?.chars) {
        tl.fromTo(
          split1.chars,
          { y: 90, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, stagger: 0.025, ease: "power4.out" },
          "-=0.3"
        );
      } else {
        tl.fromTo(line1Ref.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1 }, "-=0.3");
      }

      if (split2?.chars) {
        tl.fromTo(
          split2.chars,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.02, ease: "power4.out" },
          "-=0.6"
        );
      } else {
        tl.fromTo(line2Ref.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1 }, "-=0.7");
      }

      tl.fromTo(dividerRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.7 }, "-=0.4")
        .fromTo(subRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .fromTo(ctaRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(scrollRef.current,  { opacity: 0 },        { opacity: 1, duration: 0.6 },       "-=0.3");

      return () => {
        split1?.revert();
        split2?.revert();
      };
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0E0C0A]">

      {/* ── Static hero image ── */}
      <div ref={imgRef} className="absolute inset-0 opacity-0">
        <Image
          src="https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141140339900.webp"
          alt="GrandVenice Hotel — Main Entrance"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* ── Overlay — obsidian gradient for dramatic luxury feel ── */}
      <div ref={overlayRef} className="absolute inset-0 opacity-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0C0A]/50 via-[#0E0C0A]/25 to-[#0E0C0A]/80" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(14,12,10,0.50) 100%)" }}
        />
      </div>

      {/* ── Gold accent bars ── */}
      <div
        ref={barLeftRef}
        className="absolute top-0 left-0 w-1/3 h-[1px] origin-left"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,166,74,0.7))" }}
      />
      <div
        ref={barRightRef}
        className="absolute top-0 right-0 w-1/3 h-[1px] origin-right"
        style={{ background: "linear-gradient(270deg, transparent, rgba(201,166,74,0.7))" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,166,74,0.45) 50%, transparent)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Tagline */}
        <span
          ref={taglineRef}
          className="block font-sans text-[10px] tracking-[0.3em] text-[#C9A64A]/80 uppercase mb-6 opacity-0"
        >
          Port Harcourt · Rivers State · Nigeria
        </span>

        {/* Script accent */}
        <div className="overflow-hidden mb-2">
          <span className="block font-script text-[#E8D4A2] text-4xl md:text-5xl leading-none">
            Grand Attention, Excellent Service
          </span>
        </div>

        {/* Main headline */}
        <h1 className="perspective-[800px]">
          <span className="split-line">
            <span
              ref={line1Ref}
              className="block font-serif font-extralight text-[#F7F3EC] text-6xl md:text-8xl lg:text-[105px] leading-[0.95] tracking-[-0.01em]"
            >
              GrandVenice
            </span>
          </span>
          <span className="split-line">
            <span
              ref={line2Ref}
              className="block font-serif italic font-light text-[#F7F3EC]/90 text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wide mt-2"
            >
              Hotel &amp; Suites
            </span>
          </span>
        </h1>

        {/* Gold divider */}
        <div ref={dividerRef} className="flex items-center justify-center gap-4 my-7 origin-center">
          <div className="h-px w-16" style={{ background: "rgba(201,166,74,0.45)" }} />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A64A]/70" />
          <div className="h-px w-16" style={{ background: "rgba(201,166,74,0.45)" }} />
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-[#E8E3DB]/70 text-sm md:text-base tracking-[0.12em] max-w-sm mx-auto mb-10 opacity-0 uppercase"
        >
          {hotelInfo?.heroSubtext || "Port Harcourt's Premier Luxury Destination"}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
        >
          <Button variant="gold" size="lg" href="/booking">
            Reserve Your Stay
          </Button>
          <Button variant="ivory" size="lg" href="#rooms">
            Explore Rooms
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-[#E8E3DB]/35 text-[9px] tracking-[0.4em] uppercase">Discover</span>
        <div className="relative w-[1px] h-14 bg-[#F7F3EC]/12 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-[#C9A64A]"
            style={{
              animation: "scrollLine 2s ease-in-out infinite",
              height: "100%",
              transform: "translateY(-100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
