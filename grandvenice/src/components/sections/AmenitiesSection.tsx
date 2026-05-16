"use client";

import Image from "next/image";
import {
  Utensils, Waves, Dumbbell, Wifi,
  Car, Coffee, Shield, Briefcase, Sparkles
} from "lucide-react";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";

const amenities = [
  { Icon: Utensils,   label: "Restaurant & Bar",   desc: "International cuisine" },
  { Icon: Waves,      label: "Swimming Pool",       desc: "Outdoor infinity pool" },
  { Icon: Dumbbell,   label: "Fitness Centre",      desc: "Modern equipment" },
  { Icon: Sparkles,   label: "Spa & Wellness",      desc: "Rejuvenating treatments" },
  { Icon: Wifi,       label: "High-Speed Wi-Fi",    desc: "Complimentary internet" },
  { Icon: Car,        label: "Free Parking",        desc: "Secure parking lot" },
  { Icon: Coffee,     label: "24/7 Room Service",   desc: "In-room dining anytime" },
  { Icon: Shield,     label: "Round-Clock Security",desc: "Safety guaranteed" },
  { Icon: Briefcase,  label: "Business Centre",     desc: "Conference facilities" },
];

const showcase = [
  {
    label: "Infinity Pool",
    sublabel: "Outdoor oasis",
    // Kling 3.0 image-to-video from real pool photo
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

export function AmenitiesSection() {
  return (
    <section id="amenities" className="bg-emerald-gradient text-white overflow-hidden">

      {/* ── Top icon grid ── */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <SectionHeading
          script="Facilities"
          title="Hotel Amenities"
          subtitle="Everything you need for a perfect stay, curated with care"
          variant="light"
        />

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-px bg-white/10">
          {amenities.map(({ Icon, label, desc }, i) => (
            <FadeInView key={label} delay={i * 0.055} direction="up">
              <div className="bg-emerald-dark/80 hover:bg-gold/10 transition-all duration-400 p-5 flex flex-col items-center text-center group cursor-default min-h-[130px] justify-center">
                <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center mb-3 group-hover:border-gold/60 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <p className="font-serif text-white text-[11px] leading-tight">{label}</p>
                <p className="text-white/35 text-[9px] tracking-wider mt-1 hidden sm:block">{desc}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>

      {/* ── Gold separator ── */}
      <div className="h-px mx-20 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* ── Full-bleed image/video showcase ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {showcase.map(({ label, sublabel, video, image, fallback, tall }, i) => (
          <FadeInView key={label} delay={i * 0.15}>
            <div className={`relative overflow-hidden group ${tall ? "lg:row-span-2" : ""} ${i === 0 ? "h-[460px] lg:h-full" : "h-[300px]"}`}>
              {video ? (
                <video
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
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
                  className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={(e) => {
                    if (fallback) (e.target as HTMLImageElement).src = fallback;
                  }}
                />
              )}
              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-emerald-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-script text-gold text-2xl leading-none">{label}</p>
                <p className="text-white/60 text-[10px] tracking-[0.25em] uppercase mt-1">{sublabel}</p>
                {/* Animated gold underline */}
                <div className="h-px mt-3 bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </div>
          </FadeInView>
        ))}
      </div>

      {/* ── Bottom padding ── */}
      <div className="h-8" />
    </section>
  );
}
