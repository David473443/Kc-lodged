"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { Button } from "@/components/ui/Button";
import type { HotelInfo } from "@/types";

interface AboutSectionProps {
  hotelInfo?: HotelInfo | null;
}

const details = [
  { label: "Check-in",  value: "From 14:00" },
  { label: "Check-out", value: "By 12:00" },
  { label: "Location",  value: "Port Harcourt" },
  { label: "Rating",    value: "3-Star Luxury" },
];

export function AboutSection({ hotelInfo }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const imageUrl =
    hotelInfo?.aboutImageUrl ||
    "https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141140339900.webp";

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden">

      {/* ── Full-bleed parallax hotel image background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <Image
          src="https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/07/img1-2-1a.jpg"
          alt="GrandVenice lobby"
          fill
          className="object-cover scale-110"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* ── Dark overlays for legibility ── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-obsidian/95 via-obsidian/75 to-obsidian/40" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/60" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[700px]">

          {/* ── Left: image panel with gold frame ── */}
          <FadeInView direction="left" className="relative lg:min-h-[700px] flex items-center">
            <div className="relative w-full min-h-[420px] lg:min-h-[560px]">
              <Image
                src={imageUrl}
                alt="GrandVenice Hotel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />

              {/* Gold border frame */}
              <div className="absolute inset-5 border border-gold/30 pointer-events-none z-10" />

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-gold/60 z-10" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-gold/60 z-10" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-gold/60 z-10" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-gold/60 z-10" />

              {/* Award badge */}
              <div className="absolute bottom-10 left-6 z-20 glass-card p-5 border-gold/20">
                <p className="font-script text-gold text-2xl leading-none mb-1">Award Winning</p>
                <div className="h-px w-full bg-gold/20 my-2" />
                <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase">
                  Port Harcourt&apos;s Choice
                </p>
              </div>
            </div>
          </FadeInView>

          {/* ── Right: text column ── */}
          <div className="lg:pl-20 py-16 lg:py-24 flex flex-col justify-center">

            <FadeInView delay={0.1}>
              <span className="font-script text-gold text-3xl">Our Story</span>
            </FadeInView>

            <FadeInView delay={0.2}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[52px] font-light text-white leading-[1.1] mt-3 mb-7">
                {hotelInfo?.aboutTitle || <>A Legacy of Luxury<br />in Port Harcourt</>}
              </h2>
            </FadeInView>

            <FadeInView delay={0.25}>
              <div className="flex items-center gap-4 mb-7">
                <div className="h-px w-12 bg-gold" />
                <div className="w-2 h-2 rotate-45 bg-gold" />
                <div className="h-px w-12 bg-gold/30" />
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <p className="text-white/60 leading-[1.9] text-base mb-5 font-sans font-light">
                GrandVenice Hotel and Suites is a friendly and luxury
                accommodation provider located in the heart of Port Harcourt,
                Rivers State, Nigeria. We offer outstanding service and comfort
                with the personal touch — a place where business and leisure
                travellers find an exquisite home away from home.
              </p>
            </FadeInView>

            <FadeInView delay={0.4}>
              <p className="text-white/60 leading-[1.9] text-base mb-10 font-sans font-light">
                Strategically situated in a serene neighbourhood with proximity
                to the Shell residential area and the commercial and business
                districts, GrandVenice provides the perfect base for exploring
                Nigeria&apos;s Garden City.
              </p>
            </FadeInView>

            <FadeInView delay={0.5}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-10">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <div className="w-px h-10 bg-gold flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[10px] text-gold/80 tracking-[0.25em] uppercase mb-0.5 font-sans">
                        {d.label}
                      </p>
                      <p className="font-serif text-white text-lg font-light">
                        {d.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>

            <FadeInView delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <Button variant="gold" href="/booking">Book Your Stay</Button>
                <Button variant="ghost-white" href="#amenities">Our Amenities</Button>
              </div>
            </FadeInView>
          </div>

        </div>
      </div>
    </section>
  );
}
