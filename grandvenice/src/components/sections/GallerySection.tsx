"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Expand } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface GalleryItemInternal {
  _id: string;
  altText: string;
  category: string;
  image: { asset: { url: string } };
}

interface GallerySectionProps {
  items?: GalleryItemInternal[];
}

const REAL_HOTEL_GALLERY: GalleryItemInternal[] = [
  // ── Exterior ─────────────────────────────────────────────────────────────
  {
    _id: "r1",
    altText: "GrandVenice Hotel — Main Entrance",
    category: "exterior",
    image: { asset: { url: "https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141140339900.webp" } },
  },
  {
    _id: "r2",
    altText: "GrandVenice Hotel — Façade",
    category: "exterior",
    image: { asset: { url: "https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141508390000.webp" } },
  },
  {
    _id: "r3",
    altText: "Hotel Entrance — Fountain Courtyard",
    category: "exterior",
    image: { asset: { url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/07/img1-2-1a.jpg" } },
  },
  {
    _id: "r13",
    altText: "Hotel Grounds",
    category: "exterior",
    image: { asset: { url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/02/img1-2a.jpg" } },
  },
  {
    _id: "r16",
    altText: "Hotel Garden",
    category: "exterior",
    image: { asset: { url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2013/05/img2a.jpg" } },
  },

  // ── Rooms ─────────────────────────────────────────────────────────────────
  {
    _id: "r8",
    altText: "Suite Bedroom",
    category: "rooms",
    image: { asset: { url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/d9/a4/3d/bedroom.jpg?w=900&h=500&s=1" } },
  },
  {
    _id: "r17",
    altText: "Executive Apartment — Bedroom",
    category: "rooms",
    image: { asset: { url: "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141601327900.jpg" } },
  },
  {
    _id: "r18",
    altText: "Executive Apartment — Living Area",
    category: "rooms",
    image: { asset: { url: "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141602600800.jpg" } },
  },
  {
    _id: "r19",
    altText: "Deluxe Room",
    category: "rooms",
    image: { asset: { url: "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141604636900.jpg" } },
  },
  {
    _id: "r20",
    altText: "Standard Room",
    category: "rooms",
    image: { asset: { url: "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141606206900.jpg" } },
  },
  {
    _id: "r21",
    altText: "Guest Room",
    category: "rooms",
    image: { asset: { url: "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141607205300.jpg" } },
  },

  // ── Pool ─────────────────────────────────────────────────────────────────
  {
    _id: "r5",
    altText: "Swimming Pool",
    category: "pool",
    image: { asset: { url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/02/img2-2a.jpg" } },
  },
  {
    _id: "r6",
    altText: "Pool Area — Leisure Deck",
    category: "pool",
    image: { asset: { url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/02/img4-2a.jpg" } },
  },

  // ── Dining ───────────────────────────────────────────────────────────────
  {
    _id: "r11",
    altText: "Restaurant — Fine Dining",
    category: "dining",
    image: { asset: { url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2013/05/img1a.jpg" } },
  },

  // ── Lobby ────────────────────────────────────────────────────────────────
  {
    _id: "r4",
    altText: "Hotel Interior — Lounge Area",
    category: "lobby",
    image: { asset: { url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/07/img2-2-1a.jpg" } },
  },
  {
    _id: "r7",
    altText: "Hotel Lobby",
    category: "lobby",
    image: { asset: { url: "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/b043c48d_z.jpg" } },
  },
  {
    _id: "r9",
    altText: "Hotel Reception — Interior Entrance",
    category: "lobby",
    image: { asset: { url: "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/a13270cc_z.jpg" } },
  },
  {
    _id: "r10",
    altText: "Hotel Reception",
    category: "lobby",
    image: { asset: { url: "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/9a03d1d1_z.jpg" } },
  },
  {
    _id: "r14",
    altText: "Hotel Lobby Area",
    category: "lobby",
    image: { asset: { url: "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/a45b58d4_z.jpg" } },
  },
  {
    _id: "r15",
    altText: "Hotel Lobby — Reception Desk",
    category: "lobby",
    image: { asset: { url: "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/333f22c8_z.jpg" } },
  },

  // ── Amenities ────────────────────────────────────────────────────────────
  {
    _id: "r12",
    altText: "Hotel Amenities",
    category: "amenities",
    image: { asset: { url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/02/img1-1-1a.jpg" } },
  },
];

const CATEGORIES = [
  { key: "all",       label: "All" },
  { key: "exterior",  label: "Exterior" },
  { key: "rooms",     label: "Rooms" },
  { key: "pool",      label: "Pool" },
  { key: "dining",    label: "Dining" },
  { key: "lobby",     label: "Lobby" },
  { key: "amenities", label: "Amenities" },
];

function DoorsRevealImage({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
        unoptimized
      />

      {/* Left door — dark charcoal (Grand Noir) */}
      <motion.div
        className="absolute inset-0 right-1/2 z-10"
        style={{ background: "linear-gradient(135deg, #1E1A17 0%, #141210 100%)" }}
        initial={{ x: 0 }}
        animate={inView ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Right door — dark charcoal (Grand Noir) */}
      <motion.div
        className="absolute inset-0 left-1/2 z-10"
        style={{ background: "linear-gradient(315deg, #1E1A17 0%, #141210 100%)" }}
        initial={{ x: 0 }}
        animate={inView ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Gold seam line that fades away */}
      <motion.div
        className="absolute inset-y-0 left-1/2 -translate-x-px w-px z-20"
        style={{ background: "linear-gradient(to bottom, transparent, #C9A64A 30%, #C9A64A 70%, transparent)" }}
        initial={{ opacity: 1 }}
        animate={inView ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#0E0C0A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
        <div className="bg-[#C9A64A] p-3">
          <Expand size={20} className="text-[#0E0C0A]" />
        </div>
      </div>

      {/* Alt text label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0E0C0A]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <p className="text-[#F7F3EC] text-[10px] tracking-[0.15em] uppercase">{alt}</p>
      </div>
    </div>
  );
}

export function GallerySection({ items }: GallerySectionProps) {
  const gallery = items && items.length > 0 ? items : REAL_HOTEL_GALLERY;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? gallery
        : gallery.filter((item) => item.category === activeCategory),
    [gallery, activeCategory]
  );

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <section id="gallery" className="relative z-10 bg-[#0E0C0A] section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          script="Visual Journey"
          title="Photo Gallery"
          variant="light"
        />

        {/* Category filter tabs — gold active */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={
                activeCategory === cat.key
                  ? "bg-[#C9A64A] text-[#0E0C0A] text-[10px] tracking-[0.25em] uppercase px-5 py-2 transition-all duration-200 font-semibold"
                  : "border border-[#C9A64A]/25 text-[#8C8480] hover:border-[#C9A64A]/50 hover:text-[#E8D4A2] text-[10px] tracking-[0.25em] uppercase px-5 py-2 transition-all duration-200 cursor-pointer"
              }
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid with doors reveal */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {filtered.map((item, index) => (
            <div key={item._id} className="break-inside-avoid mb-3">
              <DoorsRevealImage
                src={item.image.asset.url}
                alt={item.altText}
                onClick={() => openLightbox(index)}
              />
            </div>
          ))}
        </div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-14"
        >
          <Button
            variant="gold-outline"
            href="https://www.grandvenicenigeria.com"
            external
          >
            Visit Official Website
          </Button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={filtered.map((item) => ({ src: item.image.asset.url }))}
      />
    </section>
  );
}
