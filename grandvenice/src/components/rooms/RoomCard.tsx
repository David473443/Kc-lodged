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
  "standard-city":        { label: "Standard",        class: "bg-obsidian/80 text-gold border border-gold/30" },
  "standard-twin":        { label: "Twin",            class: "bg-obsidian/80 text-gold border border-gold/30" },
  "executive-single":     { label: "Executive",       class: "bg-gold text-obsidian" },
  "double-suite-balcony": { label: "Suite · Balcony", class: "bg-gold text-obsidian" },
  "double-suite":         { label: "Suite",           class: "bg-gold text-obsidian" },
};

const localImages: Record<string, string> = {
  "standard-city":        "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/9a03d1d1_z.jpg",
  "standard-twin":        "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/b043c48d_z.jpg",
  "executive-single":     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/d9/a4/3d/bedroom.jpg?w=900&h=500&s=1",
  "double-suite-balcony": "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/a13270cc_z.jpg",
  "double-suite":         "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/a45b58d4_z.jpg",
};

export function RoomCard({ room }: RoomCardProps) {
  const badge    = badgeMap[room.type] || { label: room.type, class: "bg-obsidian/80 text-gold border border-gold/30" };
  const imageUrl = room.images?.[0]?.asset?.url
    || localImages[room.type]
    || "https://i.travelapi.com/lodging/13000000/12030000/12025800/12025790/9a03d1d1_z.jpg";

  return (
    <div className="luxury-card glass-card group relative flex flex-col overflow-hidden">

      {/* ── Image ── */}
      <div className="relative h-[280px] overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-obsidian/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
          <span className="text-white/40 text-[10px] ml-1 font-sans">/ night</span>
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            href={`/rooms/${room.slug?.current}`}
            className="flex items-center gap-2 bg-gold text-obsidian text-[10px] tracking-[0.25em] uppercase px-6 py-3 font-semibold hover:bg-gold-light transition-colors"
          >
            View Room <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-xl text-white font-light leading-tight">
            {room.name}
          </h3>
          <div className="w-1.5 h-1.5 rotate-45 bg-gold mt-2 flex-shrink-0" />
        </div>

        <div className="flex items-center gap-4 mb-4">
          {room.bedType && (
            <span className="flex items-center gap-1.5 text-[10px] text-white/40 tracking-wider font-sans">
              <BedDouble size={12} className="text-gold/70" />
              {room.bedType}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-[10px] text-white/40 tracking-wider font-sans">
            <Users size={12} className="text-gold/70" />
            Up to {room.maxGuests}
          </span>
          {room.squareMeters && (
            <span className="flex items-center gap-1.5 text-[10px] text-white/40 tracking-wider font-sans">
              <Maximize2 size={12} className="text-gold/70" />
              {room.squareMeters}m²
            </span>
          )}
        </div>

        {room.shortDescription && (
          <p className="text-white/40 text-sm leading-relaxed mb-5 flex-1 line-clamp-2 font-sans font-light">
            {room.shortDescription}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/8 mt-auto">
          <Link
            href={`/booking?roomId=${room._id}&room=${encodeURIComponent(room.name)}&price=${room.pricePerNight}`}
            className="text-[10px] tracking-[0.25em] uppercase text-gold font-sans font-medium border-b border-gold/30 hover:border-gold transition-all duration-300 pb-0.5"
          >
            Reserve Now
          </Link>
          <Link
            href={`/rooms/${room.slug?.current}`}
            className="text-[10px] tracking-[0.25em] uppercase text-white/30 hover:text-white/70 transition-colors flex items-center gap-1 font-sans"
          >
            Details <ArrowUpRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}
