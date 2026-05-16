"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import type { HotelInfo } from "@/types";

interface HeroSectionProps {
  hotelInfo?: HotelInfo | null;
}

export function HeroSection({ hotelInfo }: HeroSectionProps) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLSpanElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const barLeftRef  = useRef<HTMLDivElement>(null);
  const barRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(videoRef.current,  { opacity: 0 }, { opacity: 1, duration: 2 })
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 }, "-=1.6")
        .fromTo(barLeftRef.current,  { scaleX: 0, transformOrigin: "left" },  { scaleX: 1, duration: 1 }, "-=0.6")
        .fromTo(barRightRef.current, { scaleX: 0, transformOrigin: "right" }, { scaleX: 1, duration: 1 }, "<")
        .fromTo(taglineRef.current, { opacity: 0, y: 16, letterSpacing: "0.1em" }, { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 0.9 }, "-=0.4")
        .fromTo(line1Ref.current,   { opacity: 0, y: 60, rotateX: 8 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.1 }, "-=0.3")
        .fromTo(line2Ref.current,   { opacity: 0, y: 60, rotateX: 8 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.1 }, "-=0.7")
        .fromTo(subRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(ctaRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(scrollRef.current,  { opacity: 0 },        { opacity: 1, duration: 0.6 },       "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  const videoSrc = hotelInfo?.heroVideoUrl || "https://d8j0ntlcm91z4.cloudfront.net/user_33SGtlhu3Z8xFTroOP6w0dMPLwL/hf_20260516_185510_41fb108e-7713-46df-b52f-d50ca1ececda.mp4";

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden perspective-[1200px]">

      {/* ── Video ── */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105"
        poster="https://d8j0ntlcm91z4.cloudfront.net/user_33SGtlhu3Z8xFTroOP6w0dMPLwL/hf_20260515_183150_fad5fa4f-0e41-487c-97e3-73249ba0437d_min.webp"
      >
        <source src={videoSrc} type="video/mp4" />
        {/* fallback poster fills the frame when no video */}
      </video>

      {/* ── Multi-layer overlay ── */}
      <div ref={overlayRef} className="absolute inset-0 opacity-0">
        {/* Base dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70" />
        {/* Emerald tint at edges */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep/30 via-transparent to-emerald-deep/20" />
        {/* Vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
        />
      </div>

      {/* ── Gold horizontal bars ── */}
      <div
        ref={barLeftRef}
        className="absolute top-0 left-0 w-1/3 h-[1px] origin-left"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }}
      />
      <div
        ref={barRightRef}
        className="absolute top-0 right-0 w-1/3 h-[1px] origin-right"
        style={{ background: "linear-gradient(270deg, transparent, #D4AF37)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37 50%, transparent)" }}
      />

      {/* ── Grain ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Tagline */}
        <span
          ref={taglineRef}
          className="block font-sans text-[10px] tracking-[0.3em] text-gold/80 uppercase mb-6 opacity-0"
        >
          Port Harcourt · Rivers State · Nigeria
        </span>

        {/* Script accent */}
        <div className="overflow-hidden mb-2">
          <span className="block font-script text-gold text-4xl md:text-5xl leading-none">
            Welcome to
          </span>
        </div>

        {/* Main headline — two lines */}
        <h1 className="perspective-[800px]">
          <span className="split-line">
            <span
              ref={line1Ref}
              className="block font-serif font-extralight text-white text-6xl md:text-8xl lg:text-[105px] leading-[0.95] tracking-[-0.01em] opacity-0"
            >
              GrandVenice
            </span>
          </span>
          <span className="split-line">
            <span
              ref={line2Ref}
              className="block font-serif italic font-light text-white/90 text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wide mt-2 opacity-0"
            >
              Hotel &amp; Suites
            </span>
          </span>
        </h1>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-4 my-7">
          <div className="h-px w-16 bg-gold/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/70" />
          <div className="h-px w-16 bg-gold/40" />
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-white/65 text-sm md:text-base tracking-[0.12em] max-w-sm mx-auto mb-10 opacity-0 uppercase"
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
          <Button variant="ghost-white" size="lg" href="#rooms">
            Explore Rooms
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Discover</span>
        <div className="relative w-[1px] h-14 bg-white/10 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-gold"
            style={{
              animation: "scrollLine 2s ease-in-out infinite",
              height: "100%",
              transform: "translateY(-100%)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          50%  { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
