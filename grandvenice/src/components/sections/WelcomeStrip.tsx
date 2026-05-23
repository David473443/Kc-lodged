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
      className="relative flex flex-col items-center py-14 px-6 text-center group overflow-hidden bg-stone-100/80 backdrop-blur-sm"
    >
      {/* Sky-blue top bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-sky-200"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Number */}
      <div className="overflow-hidden mb-1">
        <motion.div
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.85, delay: index * 0.1 + 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-serif text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-light text-navy leading-none tracking-tight">
            <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={1800} />
          </span>
        </motion.div>
      </div>

      {/* Sky-blue thin separator */}
      <motion.div
        className="h-px w-10 bg-sky-300 mb-4"
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
        <p className="text-sky-700 text-[9px] tracking-[0.35em] uppercase font-sans font-medium mb-1.5">
          {stat.label}
        </p>
        <p className="text-grey-400 text-[9px] tracking-[0.2em] font-sans">{stat.sub}</p>
      </motion.div>

      {/* Hover sky-blue glow */}
      <div className="absolute inset-0 bg-stone-300/0 group-hover:bg-stone-300/30 transition-colors duration-700" />
    </div>
  );
}

export function WelcomeStrip() {
  return (
    <div className="relative z-10">
      {/* ── Sky-blue heritage marquee ticker ── */}
      <div className="bg-sky-700 py-2.5 overflow-hidden relative">
        <div className="marquee-wrapper">
          <div className="marquee-inner flex-shrink-0">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-5 mr-5">
                <span className="text-white text-[10px] tracking-[0.3em] uppercase font-sans font-semibold whitespace-nowrap">
                  {item}
                </span>
                <span className="text-white/40 text-[8px]">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats — light panels ── */}
      <section className="bg-stone-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone-300 divide-y lg:divide-y-0">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
