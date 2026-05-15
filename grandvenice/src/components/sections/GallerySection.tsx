"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Expand } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animations/FadeInView";

// Internal shape that accepts Sanity-style image objects
interface GalleryItemInternal {
  _id: string;
  altText: string;
  category: string;
  image: { asset: { url: string } };
}

interface GallerySectionProps {
  items?: GalleryItemInternal[];
}

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_33SGtlhu3Z8xFTroOP6w0dMPLwL";
const FALLBACK_GALLERY: GalleryItemInternal[] = [
  {
    _id: "g1",
    altText: "Hotel Exterior",
    category: "exterior",
    image: { asset: { url: `${CDN}/hf_20260515_183150_fad5fa4f-0e41-487c-97e3-73249ba0437d_min.webp` } },
  },
  {
    _id: "g2",
    altText: "Standard City View Room",
    category: "rooms",
    image: { asset: { url: `${CDN}/hf_20260515_183153_03be0af1-bf9a-4e3d-84d7-adeb7c0ca4a2_min.webp` } },
  },
  {
    _id: "g3",
    altText: "Executive Suite",
    category: "rooms",
    image: { asset: { url: `${CDN}/hf_20260515_183155_b1ef819d-6631-4609-b602-0e651861248c_min.webp` } },
  },
  {
    _id: "g4",
    altText: "Suite with Balcony",
    category: "rooms",
    image: { asset: { url: `${CDN}/hf_20260515_183158_52e5d149-ca25-41c5-80ff-a3be34883e0b_min.webp` } },
  },
  {
    _id: "g5",
    altText: "Grand Hotel Lobby",
    category: "lobby",
    image: { asset: { url: `${CDN}/hf_20260515_183201_fd8aea5b-963b-475a-9c71-5518196ca557_min.webp` } },
  },
  {
    _id: "g6",
    altText: "Infinity Pool at Sunset",
    category: "pool",
    image: { asset: { url: `${CDN}/hf_20260515_183203_01d4a5db-bac8-4377-8af4-16e9d30e2a67_min.webp` } },
  },
  {
    _id: "g7",
    altText: "Fine Dining Restaurant",
    category: "dining",
    image: { asset: { url: `${CDN}/hf_20260515_183206_d54b993d-a407-4cc0-91fb-03d442b08c22_min.webp` } },
  },
  {
    _id: "g8",
    altText: "Fitness Centre",
    category: "amenities",
    image: { asset: { url: `${CDN}/hf_20260515_183209_844e4ec4-1661-4a0a-872f-9d5a487e479e_min.webp` } },
  },
  {
    _id: "g9",
    altText: "Hotel Exterior - Real",
    category: "exterior",
    image: { asset: { url: "https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141140339900.webp" } },
  },
  {
    _id: "g10",
    altText: "Outdoor Pool",
    category: "pool",
    image: { asset: { url: "https://www.grandvenicenigeria.com/wp-content/uploads/sites/3/2016/02/img2-2a.jpg" } },
  },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "rooms", label: "Rooms" },
  { key: "pool", label: "Pool" },
  { key: "dining", label: "Dining" },
  { key: "exterior", label: "Exterior" },
  { key: "amenities", label: "Amenities" },
  { key: "lobby", label: "Lobby" },
];

export function GallerySection({ items }: GallerySectionProps) {
  const gallery = items && items.length > 0 ? items : FALLBACK_GALLERY;

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
    <section id="gallery" className="bg-emerald-dark section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          script="Visual Journey"
          title="Photo Gallery"
          variant="light"
        />

        {/* Category filter tabs */}
        <FadeInView delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={
                  activeCategory === cat.key
                    ? "bg-emerald-dark text-white text-xs tracking-widest uppercase px-5 py-2 transition-all duration-200 border border-emerald-dark"
                    : "border border-gray-200 text-gray-500 hover:border-gold hover:text-gold text-xs tracking-widest uppercase px-5 py-2 transition-all duration-200 cursor-pointer"
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeInView>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {filtered.map((item, index) => (
            <div
              key={item._id}
              className="break-inside-avoid mb-3 relative overflow-hidden group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={item.image.asset.url}
                alt={item.altText}
                width={600}
                height={400}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Expand size={24} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* View more CTA */}
        <FadeInView delay={0.2}>
          <div className="flex justify-center mt-12">
            <Button
              variant="ghost-white"
              href="https://instagram.com"
              external
            >
              View More on Instagram
            </Button>
          </div>
        </FadeInView>
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
