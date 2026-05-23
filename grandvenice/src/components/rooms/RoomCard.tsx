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
  "standard-city":        { label: "Standard",        class: "bg-white/90 text-navy border border-sky-200" },
  "standard-twin":        { label: "Twin",            class: "bg-white/90 text-navy border border-sky-200" },
  "executive-single":     { label: "Executive",       class: "bg-sky-700 text-white" },
  "double-suite-balcony": { label: "Suite · Balcony", class: "bg-navy text-white" },
  "double-suite":         { label: "Suite",           class: "bg-navy text-white" },
};

const localImages: Record<string, string> = {
  "standard-city":        "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141606206900.jpg",
  "standard-twin":        "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141607205300.jpg",
  "executive-single":     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/d9/a4/3d/bedroom.jpg?w=900&h=500&s=1",
  "double-suite-balcony": "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141601327900.jpg",
  "double-suite":         "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141602600800.jpg",
};

export function RoomCard({ room }: RoomCardProps) {
  const badge    = badgeMap[room.type] || { label: room.type, class: "bg-white/90 text-navy border border-sky-200" };
  const imageUrl = room.images?.[0]?.asset?.url
    || localImages[room.type]
    || "https://a.otcdn.com/imglib/roomphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141604636900.jpg";

  return (
    <div className="luxury-card group relative flex flex-col overflow-hidden bg-stone-100 border border-stone-300 hover:border-stone-400 transition-colors duration-500">

      {/* ── Image ── */}
      <div className="relative h-[280px] overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
        {/* Sky-blue tint on hover */}
        <div className="absolute inset-0 bg-sky-700/0 group-hover:bg-sky-700/15 transition-all duration-500" />

        {/* Badge */}
        <span className={cn(
          "absolute top-4 left-4 text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 font-semibold z-10 backdrop-blur-sm",
          badge.class
        )}>
          {badge.label}
        </span>

        {/* Price */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <span className="font-serif text-2xl text-white font-light leading-none">
            {formatNGN(room.pricePerNight)}
          </span>
          <span className="text-white/50 text-[10px] ml-1 font-sans">/ night</span>
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            href={`/rooms/${room.slug?.current}`}
            className="flex items-center gap-2 bg-sky-700 text-white text-[10px] tracking-[0.25em] uppercase px-6 py-3 font-semibold hover:bg-sky-600 transition-colors"
          >
            View Room <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-xl text-navy font-light leading-tight">
            {room.name}
          </h3>
          <div className="w-1.5 h-1.5 rotate-45 bg-sky-400 mt-2 flex-shrink-0" />
        </div>

        <div className="flex items-center gap-4 mb-4">
          {room.bedType && (
            <span className="flex items-center gap-1.5 text-[10px] text-slate tracking-wider font-sans">
              <BedDouble size={12} className="text-sky-500" />
              {room.bedType}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-[10px] text-slate tracking-wider font-sans">
            <Users size={12} className="text-sky-500" />
            Up to {room.maxGuests}
          </span>
          {room.squareMeters && (
            <span className="flex items-center gap-1.5 text-[10px] text-slate tracking-wider font-sans">
              <Maximize2 size={12} className="text-sky-500" />
              {room.squareMeters}m²
            </span>
          )}
        </div>

        {room.shortDescription && (
          <p className="text-slate text-sm leading-relaxed mb-5 flex-1 line-clamp-2 font-sans font-light">
            {room.shortDescription}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-stone-300 mt-auto">
          <Link
            href={`/booking?roomId=${room._id}&room=${encodeURIComponent(room.name)}&price=${room.pricePerNight}`}
            className="text-[10px] tracking-[0.25em] uppercase text-sky-700 font-sans font-medium border-b border-sky-300 hover:border-sky-600 transition-all duration-300 pb-0.5"
          >
            Reserve Now
          </Link>
          <Link
            href={`/rooms/${room.slug?.current}`}
            className="text-[10px] tracking-[0.25em] uppercase text-slate hover:text-navy transition-colors flex items-center gap-1 font-sans"
          >
            Details <ArrowUpRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}
