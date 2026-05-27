"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const hours = [
  { meal: "Breakfast", time: "6:30 AM – 10:30 AM" },
  { meal: "Lunch",     time: "12:00 PM – 3:00 PM" },
  { meal: "Dinner",    time: "6:30 PM – 10:30 PM" },
];

export function DiningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="dining" ref={sectionRef} className="relative z-10 overflow-hidden">
      <div className="bg-[#141210]">

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* ── Text column ── */}
            <div>
              <SectionHeading
                script="Culinary Excellence"
                title="The GrandVenice Restaurant"
                subtitle="A gastronomic journey through international flavours"
                align="left"
                variant="light"
              />

              <FadeInView delay={0.2}>
                <p className="text-[#E8E3DB]/70 leading-[1.9] text-lg mb-6 font-sans font-light">
                  Experience culinary artistry at its finest at our signature
                  restaurant. Our talented chefs craft exquisite dishes inspired
                  by international flavours, using the finest local and imported
                  ingredients — from Nigerian delicacies to continental classics.
                </p>
              </FadeInView>

              <FadeInView delay={0.3}>
                <p className="text-[#E8E3DB]/70 leading-[1.9] text-lg mb-10 font-sans font-light">
                  Whether joining us for an intimate breakfast, a business lunch,
                  or a romantic dinner, the GrandVenice Restaurant delivers an
                  unparalleled dining experience in an elegant setting.
                </p>
              </FadeInView>

              {/* Opening hours */}
              <FadeInView delay={0.4}>
                <div className="border border-[#C9A64A]/30 p-7 mb-10 bg-[#1E1A17] shadow-[var(--shadow-xs)]">
                  <p className="text-[#C9A64A] text-[10px] tracking-[0.35em] uppercase mb-6 font-sans font-semibold">
                    Opening Hours
                  </p>
                  <ul className="space-y-5">
                    {hours.map(({ meal, time }) => (
                      <li key={meal} className="flex justify-between items-center">
                        <span className="text-[#E8E3DB]/70 text-sm font-sans tracking-wide">{meal}</span>
                        <div className="h-px flex-1 mx-5 bg-[#2A2520]" />
                        <span className="font-serif text-[#E8D4A2] text-lg font-light">{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInView>

              <FadeInView delay={0.5}>
                <Button variant="gold" href="/booking">
                  Reserve a Table
                </Button>
              </FadeInView>
            </div>

            {/* ── Image/video panel ── */}
            <FadeInView direction="right">
              <div className="relative h-[580px] overflow-hidden shadow-[var(--shadow-lg)]">
                {/* Parallax restaurant background */}
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                  <Image
                    src="https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2013/05/img1a.jpg"
                    alt="GrandVenice Restaurant"
                    fill
                    className="object-cover scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Lobby video overlay */}
                <video
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/07/img1-2-1a.jpg"
                >
                  <source
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_33SGtlhu3Z8xFTroOP6w0dMPLwL/hf_20260516_214038_424bbc78-faa4-47dd-9909-bf7cffc9644d.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/65 via-transparent to-transparent" />

                {/* Corner frames — gold */}
                <div className="absolute inset-5 border border-[#C9A64A]/25 pointer-events-none z-10" />
                <div className="absolute top-3 left-3 w-9 h-9 border-t-2 border-l-2 border-[#C9A64A]/35 z-10" />
                <div className="absolute top-3 right-3 w-9 h-9 border-t-2 border-r-2 border-[#C9A64A]/35 z-10" />
                <div className="absolute bottom-3 left-3 w-9 h-9 border-b-2 border-l-2 border-[#C9A64A]/35 z-10" />
                <div className="absolute bottom-3 right-3 w-9 h-9 border-b-2 border-r-2 border-[#C9A64A]/35 z-10" />

                {/* Label overlay */}
                <div className="absolute bottom-10 left-8 z-20">
                  <p className="font-script text-[#E8D4A2] text-4xl leading-none">The Lobby</p>
                  <p className="text-white/55 text-[10px] tracking-[0.35em] uppercase mt-2 font-sans">Grand Reception</p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
