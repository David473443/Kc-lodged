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
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const imageUrl =
    hotelInfo?.aboutImageUrl ||
    "https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141140339900.webp";

  return (
    <section id="about" ref={sectionRef} className="relative z-10 overflow-hidden">
      <div className="bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-6 py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[720px]">

            {/* ── Left: framed hotel image ── */}
            <FadeInView direction="left" className="relative lg:min-h-[720px] flex items-center">
              <div className="relative w-full min-h-[460px] lg:min-h-[620px] overflow-hidden">
                <motion.div className="absolute inset-0" style={{ y: imgY }}>
                  <Image
                    src={imageUrl}
                    alt="GrandVenice Hotel"
                    fill
                    className="object-cover scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/30 via-transparent to-transparent" />

                {/* Corner frame — gold tint */}
                <div className="absolute inset-5 border border-[#C9A64A]/20 pointer-events-none z-10" />
                <div className="absolute top-3 left-3 w-9 h-9 border-t-2 border-l-2 border-[#C9A64A]/35 z-10" />
                <div className="absolute top-3 right-3 w-9 h-9 border-t-2 border-r-2 border-[#C9A64A]/35 z-10" />
                <div className="absolute bottom-3 left-3 w-9 h-9 border-b-2 border-l-2 border-[#C9A64A]/35 z-10" />
                <div className="absolute bottom-3 right-3 w-9 h-9 border-b-2 border-r-2 border-[#C9A64A]/35 z-10" />

                {/* Heritage badge — dark card on ivory photo */}
                <div className="absolute bottom-12 left-6 z-20 bg-[#141210] p-6 border border-[#C9A64A]/30 shadow-[var(--shadow-md)]">
                  <p className="font-script text-[#C9A64A] text-3xl leading-none mb-1">Since 2014</p>
                  <div className="h-px w-full bg-[#C9A64A]/40 my-2.5" />
                  <p className="text-[#E8E3DB]/60 text-[10px] tracking-[0.35em] uppercase font-sans">
                    Port Harcourt&apos;s Choice
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* ── Right: text column ── */}
            <div className="lg:pl-20 py-20 lg:py-28 flex flex-col justify-center">

              <FadeInView delay={0.1}>
                <span className="font-script text-[#9B7A23] text-4xl lg:text-5xl">Our Story</span>
              </FadeInView>

              <FadeInView delay={0.2}>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-[64px] font-light text-[#1A1614] leading-[1.05] mt-3 mb-6 tracking-wide">
                  {hotelInfo?.aboutTitle || <>A Legacy of Luxury<br />in Port Harcourt</>}
                </h2>
              </FadeInView>

              <FadeInView delay={0.25}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-14 bg-[#9B7A23]/50" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A64A]" />
                  <div className="h-px w-5 bg-[#9B7A23]/30" />
                </div>
              </FadeInView>

              <FadeInView delay={0.3}>
                <p className="text-[#5C5450] leading-[1.9] text-lg mb-6 font-sans font-light">
                  GrandVenice Hotel and Suites is a friendly and luxury
                  accommodation provider located in Port Harcourt,
                  Rivers State, Nigeria. GrandVenice Port Harcourt offers its guests
                  outstanding service and comfort with the personal touch.
                </p>
              </FadeInView>

              <FadeInView delay={0.4}>
                <p className="text-[#5C5450] leading-[1.9] text-lg mb-10 font-sans font-light">
                  The GrandVenice Hotel is modern and contemporary and provides
                  an impressive contrast to most Port Harcourt City&apos;s hotels.
                  With several deluxe and deluxe plus rooms offering stunning views
                  across the Garden City.
                </p>
              </FadeInView>

              <FadeInView delay={0.5}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-10 p-7 bg-[#EDE8DF] border border-[#C9A64A]/25 shadow-[var(--shadow-xs)]">
                  {details.map((d) => (
                    <div key={d.label} className="flex items-start gap-3">
                      <div className="w-[2px] h-10 bg-[#C9A64A] flex-shrink-0 mt-1 rounded-full" />
                      <div>
                        <p className="text-[10px] text-[#9B7A23] tracking-[0.28em] uppercase mb-1 font-sans font-semibold">
                          {d.label}
                        </p>
                        <p className="font-serif text-[#1A1614] text-lg font-light">
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
                  <Button variant="dark" href="#amenities">Our Amenities</Button>
                </div>
              </FadeInView>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
