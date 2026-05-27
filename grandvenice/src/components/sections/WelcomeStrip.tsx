"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 41,  suffix: "",    label: "Rooms & Suites",      sub: "Curated accommodations" },
  { value: 10,  suffix: "+",   label: "Years of Excellence", sub: "A decade of luxury" },
  { value: 4,   suffix: ".8★", label: "Guest Rating",        sub: "Consistently outstanding" },
  { value: 24,  suffix: "/7",  label: "Concierge",           sub: "Always at your service" },
];

const marqueeItems = [
  "Luxury Redefined",
  "Port Harcourt's Finest",
  "Award-Winning Hospitality",
  "Venetian Elegance",
  "World-Class Amenities",
  "Nigerian Excellence",
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center py-16 px-6 text-center group overflow-hidden bg-[#0E0C0A]"
    >
      {/* Gold top bar — grows in */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#C9A64A]"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Number */}
      <div className="overflow-hidden mb-2">
        <motion.div
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.85, delay: index * 0.1 + 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="font-serif font-extralight text-[#C9A64A] leading-none tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
          >
            <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={1800} />
          </span>
        </motion.div>
      </div>

      {/* Thin separator */}
      <motion.div
        className="h-px w-8 bg-[#C9A64A]/50 mb-5"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
      />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1 + 0.55, ease: "easeOut" }}
      >
        <p className="text-[#E8D4A2] text-[10px] tracking-[0.35em] uppercase font-sans font-semibold mb-2">
          {stat.label}
        </p>
        <p className="text-[#8C8480] text-[10px] tracking-[0.2em] font-sans">{stat.sub}</p>
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#C9A64A]/0 group-hover:bg-[#C9A64A]/4 transition-colors duration-700" />
    </div>
  );
}

export function WelcomeStrip() {
  return (
    <div className="relative z-10">
      {/* ── Heritage marquee ticker — obsidian bg with gold text ── */}
      <div className="bg-[#080806] border-y border-[#C9A64A]/20 py-3 overflow-hidden relative">
        <div className="marquee-wrapper">
          <div className="marquee-inner flex-shrink-0">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-6 mr-6">
                <span className="text-[#E8D4A2] text-[10px] tracking-[0.35em] uppercase font-sans font-semibold whitespace-nowrap">
                  {item}
                </span>
                <span className="text-[#C9A64A]/50 text-[8px]">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <section className="bg-[#0E0C0A]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#2A2520] divide-y lg:divide-y-0 border-b border-[#2A2520]">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
