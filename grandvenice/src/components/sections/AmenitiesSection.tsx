"use client";

import Image from "next/image";
import {
  Utensils,
  Waves,
  Dumbbell,
  Wifi,
  Car,
  Coffee,
  Shield,
  Briefcase,
} from "lucide-react";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";

const amenities = [
  { Icon: Utensils, label: "Restaurant & Bar", desc: "International cuisine" },
  { Icon: Waves, label: "Swimming Pool", desc: "Outdoor infinity pool" },
  { Icon: Dumbbell, label: "Fitness Centre", desc: "Modern equipment" },
  { Icon: Wifi, label: "Free Wi-Fi", desc: "High-speed internet" },
  { Icon: Car, label: "Free Parking", desc: "Secure parking lot" },
  { Icon: Coffee, label: "Room Service", desc: "24/7 in-room dining" },
  { Icon: Shield, label: "24/7 Security", desc: "Round-the-clock safety" },
  { Icon: Briefcase, label: "Business Centre", desc: "Conference facilities" },
];

const showcaseItems = [
  {
    label: "Outdoor Pool",
    image:
      "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/02/img2-2a.jpg",
  },
  {
    label: "Restaurant & Bar",
    image: "/images/amenities/restaurant.jpg",
  },
  {
    label: "Fitness Centre",
    image: "/images/amenities/gym.jpg",
  },
];

export function AmenitiesSection() {
  return (
    <section
      id="amenities"
      className="bg-emerald-dark text-white section-padding"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          script="Facilities"
          title="Hotel Amenities"
          subtitle="Everything you need for a perfect stay"
          variant="light"
        />

        {/* Icon grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          {amenities.map(({ Icon, label, desc }, index) => (
            <FadeInView
              key={label}
              direction="up"
              delay={index * 0.07}
            >
              <div className="border border-white/10 bg-white/5 hover:bg-gold/10 hover:border-gold/40 transition-all duration-300 p-6 flex flex-col items-center text-center cursor-default">
                <Icon size={28} className="text-gold mb-3" />
                <p className="font-serif text-white text-sm mt-2">{label}</p>
                <p className="text-white/50 text-xs mt-1">{desc}</p>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Featured image showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {showcaseItems.map(({ label, image }, index) => (
            <FadeInView key={label} direction="up" delay={index * 0.12}>
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src={image}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-gold font-serif text-lg tracking-wide">
                    {label}
                  </p>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
