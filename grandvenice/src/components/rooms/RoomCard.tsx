import Image from "next/image";
import Link from "next/link";
import { Users, Maximize2, BedDouble, ArrowUpRight } from "lucide-react";
import { formatNGN } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
}

const badgeMap: Record<string, { label: string; class: string }> = {
  "standard-city":        { label: "Standard",        class: "bg-[#1E1A17] text-[#E8D4A2] border border-[#C9A64A]/30" },
  "standard-twin":        { label: "Twin",            class: "bg-[#1E1A17] text-[#E8D4A2] border border-[#C9A64A]/30" },
  "executive-single":     { label: "Executive",       class: "bg-[#C9A64A] text-[#0E0C0A]" },
  "double-suite-balcony": { label: "Suite · Balcony", class: "bg-[#C9A64A] text-[#0E0C0A]" },
  "double-suite":         { label: "Suite",           class: "bg-[#C9A64A] text-[#0E0C0A]" },
};

const localImages: Record<string, string> = {
  "standard-city":        "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141606206900.jpg",
  "standard-twin":        "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141607205300.jpg",
  "executive-single":     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/d9/a4/3d/bedroom.jpg?w=900&h=500&s=1",
  "double-suite-balcony": "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141601327900.jpg",
  "double-suite":         "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141602600800.jpg",
};

export function RoomCard({ room }: RoomCardProps) {
  const badge    = badgeMap[room.type] || { label: room.type, class: "bg-[#1E1A17] text-[#E8D4A2] border border-[#C9A64A]/30" };
  const imageUrl = room.images?.[0]?.asset?.url
    || localImages[room.type]
    || "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141604636900.jpg";

  return (
    <div className="luxury-card group relative flex flex-col overflow-hidden bg-[#141210] border border-[#2A2520]">

      {/* ── Image ── */}
      <div className="relative h-[300px] overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/80 via-[#0E0C0A]/10 to-transparent" />
        <div className="absolute inset-0 bg-[#C9A64A]/0 group-hover:bg-[#C9A64A]/8 transition-all duration-600" />

        {/* Badge */}
        <span className={cn(
          "absolute top-4 left-4 text-[9px] tracking-[0.28em] uppercase px-3.5 py-1.5 font-semibold z-10 backdrop-blur-sm",
          badge.class
        )}>
          {badge.label}
        </span>

        {/* Price — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <span className="font-serif text-3xl text-[#F7F3EC] font-extralight leading-none">
            {formatNGN(room.pricePerNight)}
          </span>
          <span className="text-[#E8E3DB]/40 text-[10px] ml-1.5 font-sans tracking-wide">/ night</span>
        </div>

        {/* Hover CTA — centered */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            href={`/rooms/${room.slug?.current}`}
            className="flex items-center gap-2 bg-[#C9A64A] text-[#0E0C0A] text-[10px] tracking-[0.28em] uppercase px-7 py-3.5 font-semibold hover:bg-[#E8D4A2] transition-colors shadow-[0_4px_20px_rgba(201,166,74,0.40)]"
          >
            View Room <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Corner frame decorations */}
        <div className="absolute top-3 right-3 w-7 h-7 border-t border-r border-[#C9A64A]/25 z-10 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-7 h-7 border-b border-r border-[#C9A64A]/25 z-10 pointer-events-none" />
      </div>

      {/* ── Content ── */}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-serif text-2xl text-[#F7F3EC] font-light leading-tight">
            {room.name}
          </h3>
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A64A]/60 mt-2 flex-shrink-0" />
        </div>

        <div className="flex items-center gap-5 mb-5">
          {room.bedType && (
            <span className="flex items-center gap-1.5 text-[10px] text-[#8C8480] tracking-widest font-sans uppercase">
              <BedDouble size={12} className="text-[#C9A64A]" />
              {room.bedType}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-[10px] text-[#8C8480] tracking-widest font-sans uppercase">
            <Users size={12} className="text-[#C9A64A]" />
            Up to {room.maxGuests}
          </span>
          {room.squareMeters && (
            <span className="flex items-center gap-1.5 text-[10px] text-[#8C8480] tracking-widest font-sans uppercase">
              <Maximize2 size={12} className="text-[#C9A64A]" />
              {room.squareMeters}m²
            </span>
          )}
        </div>

        {room.shortDescription && (
          <p className="text-[#8C8480] text-sm leading-[1.75] mb-6 flex-1 line-clamp-2 font-sans font-light">
            {room.shortDescription}
          </p>
        )}

        <div className="flex items-center justify-between pt-5 border-t border-[#2A2520] mt-auto">
          <Link
            href={`/booking?roomId=${room._id}&room=${encodeURIComponent(room.name)}&price=${room.pricePerNight}`}
            className="text-[10px] tracking-[0.28em] uppercase text-[#C9A64A] font-sans font-semibold border-b border-[#C9A64A]/40 hover:border-[#C9A64A] transition-all duration-300 pb-0.5"
          >
            Reserve Now
          </Link>
          <Link
            href={`/rooms/${room.slug?.current}`}
            className="text-[10px] tracking-[0.28em] uppercase text-[#8C8480] hover:text-[#E8E3DB] transition-colors flex items-center gap-1.5 font-sans"
          >
            Details <ArrowUpRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}
