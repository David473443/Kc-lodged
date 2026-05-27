"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Utensils, Waves, Dumbbell, Wifi,
  Car, Coffee, Shield, Briefcase, Sparkles
} from "lucide-react";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";

const amenities = [
  { Icon: Utensils,   label: "Restaurant & Bar",    desc: "International cuisine" },
  { Icon: Waves,      label: "Swimming Pool",        desc: "Outdoor infinity pool" },
  { Icon: Dumbbell,   label: "Fitness Centre",       desc: "Modern equipment" },
  { Icon: Sparkles,   label: "Spa & Wellness",       desc: "Rejuvenating treatments" },
  { Icon: Wifi,       label: "High-Speed Wi-Fi",     desc: "Complimentary internet" },
  { Icon: Car,        label: "Free Parking",         desc: "Secure parking lot" },
  { Icon: Coffee,     label: "24/7 Room Service",    desc: "In-room dining anytime" },
  { Icon: Shield,     label: "Round-Clock Security", desc: "Safety guaranteed" },
  { Icon: Briefcase,  label: "Business Centre",      desc: "Conference facilities" },
];

const showcase = [
  {
    label: "Infinity Pool",
    sublabel: "Outdoor oasis",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_33SGtlhu3Z8xFTroOP6w0dMPLwL/hf_20260516_214029_702ef25c-cd7d-447a-bb2c-9272c2f6a934.mp4",
    image: null,
    fallback: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/02/img2-2a.jpg",
    tall: true,
  },
  {
    label: "Fine Dining",
    sublabel: "International cuisine",
    video: null,
    image: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2013/05/img1a.jpg",
    fallback: null,
    tall: false,
  },
  {
    label: "Conference & Events",
    sublabel: "Business facilities",
    video: null,
    image: "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/333f22c8_z.jpg",
    fallback: null,
    tall: false,
  },
];

function AmenityRow({ Icon, label, desc, index }: { Icon: React.ElementType; label: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-5 px-7 py-6 group cursor-default relative bg-[#F7F3EC] hover:bg-[#EDE8DF] transition-colors duration-400"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left accent bar */}
      <motion.div
        className="w-[2px] flex-shrink-0 bg-[#C9A64A]/35 group-hover:bg-[#C9A64A] transition-colors duration-500 rounded-full"
        style={{ height: 40 }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.06 + 0.15, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Icon — dark square on ivory for high contrast */}
      <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-[#141210] border border-[#1E1A17] group-hover:border-[#C9A64A]/50 transition-all duration-400">
        <Icon
          size={16}
          className="text-[#C9A64A] transition-colors duration-400"
        />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-[#1A1614] text-sm font-sans font-light tracking-wide leading-none mb-1.5 group-hover:text-[#9B7A23] transition-colors duration-300">
          {label}
        </p>
        <p className="text-[#8C8480] text-[10px] tracking-[0.18em] font-sans uppercase">{desc}</p>
      </div>
    </motion.div>
  );
}

export function AmenitiesSection() {
  return (
    <section id="amenities" className="relative z-10 overflow-hidden bg-[#F7F3EC]">

      {/* ── Heading ── */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <SectionHeading
          script="Facilities"
          title="Hotel Amenities"
          subtitle="Everything you need for a perfect stay, curated with care and attention"
          variant="dark"
        />
      </div>

      {/* ── Amenity grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#EDE8DF] shadow-[var(--shadow-xs)]">
          {amenities.map(({ Icon, label, desc }, i) => (
            <div
              key={label}
              className="border-b border-r border-[#EDE8DF] last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <AmenityRow Icon={Icon} label={label} desc={desc} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Hairline separator — gold ── */}
      <div className="h-px mx-10 gold-line" />

      {/* ── Full-bleed image/video showcase ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {showcase.map(({ label, sublabel, video, image, fallback, tall }, i) => (
          <FadeInView key={label} delay={i * 0.15}>
            <div className={`relative overflow-hidden group ${tall ? "lg:row-span-2" : ""} ${i === 0 ? "h-[460px] lg:h-full" : "h-[320px]"}`}>
              {video ? (
                <video
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  poster={fallback || undefined}
                >
                  <source src={video} type="video/mp4" />
                  {fallback && (
                    <Image src={fallback} alt={label} fill className="object-cover" sizes="33vw" />
                  )}
                </video>
              ) : (
                <Image
                  src={image!}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/80 via-[#0E0C0A]/10 to-transparent" />
              <div className="absolute inset-0 bg-[#C9A64A]/0 group-hover:bg-[#C9A64A]/8 transition-all duration-600" />

              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-script text-[#E8D4A2] text-2xl leading-none">{label}</p>
                <p className="text-white/55 text-[10px] tracking-[0.28em] uppercase mt-1.5 font-sans">{sublabel}</p>
                <div className="h-px mt-4 bg-[#C9A64A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600" />
              </div>
            </div>
          </FadeInView>
        ))}
      </div>

      <div className="h-8 bg-[#F7F3EC]" />
    </section>
  );
}
