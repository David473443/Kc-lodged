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
  "standard-city":        { label: "Standard",         class: "bg-white/90 text-emerald-dark" },
  "standard-twin":        { label: "Twin",             class: "bg-white/90 text-emerald-dark" },
  "executive-single":     { label: "Executive",        class: "bg-gold text-emerald-dark" },
  "double-suite-balcony": { label: "Suite · Balcony",  class: "bg-emerald-dark text-white" },
  "double-suite":         { label: "Suite",            class: "bg-emerald-dark text-white" },
};

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_33SGtlhu3Z8xFTroOP6w0dMPLwL";
const localImages: Record<string, string> = {
  "standard-city":        `${CDN}/hf_20260515_183153_03be0af1-bf9a-4e3d-84d7-adeb7c0ca4a2_min.webp`,
  "standard-twin":        `${CDN}/hf_20260515_183153_03be0af1-bf9a-4e3d-84d7-adeb7c0ca4a2_min.webp`,
  "executive-single":     `${CDN}/hf_20260515_183155_b1ef819d-6631-4609-b602-0e651861248c_min.webp`,
  "double-suite-balcony": `${CDN}/hf_20260515_183158_52e5d149-ca25-41c5-80ff-a3be34883e0b_min.webp`,
  "double-suite":         `${CDN}/hf_20260515_183153_03be0af1-bf9a-4e3d-84d7-adeb7c0ca4a2_min.webp`,
};

export function RoomCard({ room }: RoomCardProps) {
  const badge    = badgeMap[room.type] || { label: room.type, class: "bg-white/90 text-emerald-dark" };
  const imageUrl = room.images?.[0]?.asset?.url || localImages[room.type]
    || `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80`;

  return (
    <div className="luxury-card group relative flex flex-col bg-white overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)]">

      {/* ── Image ── */}
      <div className="relative h-[280px] overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay always */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-emerald-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        <span className={cn(
          "absolute top-4 left-4 text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 font-semibold z-10",
          badge.class
        )}>
          {badge.label}
        </span>

        {/* Price on image bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-serif text-2xl text-white font-light leading-none">
                {formatNGN(room.pricePerNight)}
              </span>
              <span className="text-white/50 text-[10px] ml-1">/ night</span>
            </div>
          </div>
        </div>

        {/* View Room CTA — appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            href={`/rooms/${room.slug?.current}`}
            className="flex items-center gap-2 bg-gold text-emerald-dark text-[10px] tracking-[0.25em] uppercase px-6 py-3 font-bold hover:bg-gold-light transition-colors"
          >
            View Room <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-xl text-emerald-dark font-light leading-tight">
            {room.name}
          </h3>
          {/* Gold accent dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 mb-4">
          {room.bedType && (
            <span className="flex items-center gap-1.5 text-[10px] text-muted tracking-wider">
              <BedDouble size={12} className="text-gold" />
              {room.bedType}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-[10px] text-muted tracking-wider">
            <Users size={12} className="text-gold" />
            Up to {room.maxGuests}
          </span>
          {room.squareMeters && (
            <span className="flex items-center gap-1.5 text-[10px] text-muted tracking-wider">
              <Maximize2 size={12} className="text-gold" />
              {room.squareMeters}m²
            </span>
          )}
        </div>

        {room.shortDescription && (
          <p className="text-muted text-sm leading-relaxed mb-5 flex-1 line-clamp-2">
            {room.shortDescription}
          </p>
        )}

        {/* Bottom CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <Link
            href={`/booking?roomId=${room._id}&room=${encodeURIComponent(room.name)}&price=${room.pricePerNight}`}
            className="text-[10px] tracking-[0.25em] uppercase text-emerald font-semibold border-b border-emerald/30 hover:border-gold hover:text-gold transition-all duration-300 pb-0.5"
          >
            Reserve Now
          </Link>
          <Link
            href={`/rooms/${room.slug?.current}`}
            className="text-[10px] tracking-[0.25em] uppercase text-muted hover:text-emerald-dark transition-colors flex items-center gap-1"
          >
            Details <ArrowUpRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}
