"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const BACKDROP_IMAGES = [
  {
    sectionId: "hero",
    url: "https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141140339900.webp",
  },
  {
    sectionId: "about",
    url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/07/img1-2-1a.jpg",
  },
  {
    sectionId: "rooms",
    url: "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141601327900.jpg",
  },
  {
    sectionId: "amenities",
    url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/02/img2-2a.jpg",
  },
  {
    sectionId: "dining",
    url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2013/05/img1a.jpg",
  },
  {
    sectionId: "gallery",
    url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/02/img1-2a.jpg",
  },
  {
    sectionId: "testimonials",
    url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/07/img2-2-1a.jpg",
  },
  {
    sectionId: "booking-cta",
    url: "https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141508390000.webp",
  },
];

export function ScrollImageBackdrop() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    BACKDROP_IMAGES.forEach((entry, index) => {
      const el = document.getElementById(entry.sectionId);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveIndex(index);
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const current = BACKDROP_IMAGES[activeIndex];

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={current.url}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={current.url}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={activeIndex === 0}
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* Warm stone-gray tint to unify palette with page */}
      <div className="absolute inset-0" style={{ background: "rgba(243,241,237,0.58)" }} />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(243,241,237,0.40) 100%)",
        }}
      />
    </div>
  );
}
