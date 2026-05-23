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
      <div className="bg-stone-100/90 backdrop-blur-sm">

        {/* ── Content ── */}
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Text column ── */}
            <div>
              <SectionHeading
                script="Culinary Excellence"
                title="The GrandVenice Restaurant"
                subtitle="A gastronomic journey through international flavours"
                align="left"
                variant="dark"
              />

              <FadeInView delay={0.2}>
                <p className="text-slate leading-[1.9] text-lg mb-5 font-sans font-light">
                  Experience culinary artistry at its finest at our signature
                  restaurant. Our talented chefs craft exquisite dishes inspired
                  by international flavours, using the finest local and imported
                  ingredients — from Nigerian delicacies to continental classics.
                </p>
              </FadeInView>

              <FadeInView delay={0.3}>
                <p className="text-slate leading-[1.9] text-lg mb-8 font-sans font-light">
                  Whether joining us for an intimate breakfast, a business lunch,
                  or a romantic dinner, the GrandVenice Restaurant delivers an
                  unparalleled dining experience in an elegant setting.
                </p>
              </FadeInView>

              {/* Opening hours */}
              <FadeInView delay={0.4}>
                <div className="border border-stone-300 p-6 mb-8 bg-stone-200/50">
                  <p className="text-sky-600 text-[10px] tracking-[0.3em] uppercase mb-5 font-sans">
                    Opening Hours
                  </p>
                  <ul className="space-y-4">
                    {hours.map(({ meal, time }) => (
                      <li key={meal} className="flex justify-between items-center">
                        <span className="text-slate text-sm font-sans">{meal}</span>
                        <div className="h-px flex-1 mx-4 bg-stone-300" />
                        <span className="font-serif text-navy font-light">{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInView>

              <FadeInView delay={0.5}>
                <Button variant="sky" href="/booking">
                  Reserve a Table
                </Button>
              </FadeInView>
            </div>

            {/* ── Image/video panel ── */}
            <FadeInView direction="right">
              <div className="relative h-[540px] overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

                {/* Navy corner frame */}
                <div className="absolute inset-5 border border-sky-200/40 pointer-events-none z-10" />
                <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-white/40 z-10" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-white/40 z-10" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-white/40 z-10" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-white/40 z-10" />

                {/* Label overlay */}
                <div className="absolute bottom-10 left-8 z-20">
                  <p className="font-script text-gold-light text-3xl leading-none">The Lobby</p>
                  <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase mt-1 font-sans">Grand Reception</p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
