import Image from "next/image";
import Link from "next/link";
import { Users, Maximize2, BedDouble, ArrowRight } from "lucide-react";
import { formatNGN } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
}

const roomTypeBadge: Record<string, { label: string; color: string }> = {
  "standard-city":        { label: "Standard", color: "bg-white/90 text-emerald-dark" },
  "standard-twin":        { label: "Twin", color: "bg-white/90 text-emerald-dark" },
  "executive-single":     { label: "Executive", color: "bg-gold/90 text-emerald-dark" },
  "double-suite-balcony": { label: "Suite — Balcony", color: "bg-emerald-dark text-white" },
  "double-suite":         { label: "Suite", color: "bg-emerald-dark text-white" },
};

export function RoomCard({ room }: RoomCardProps) {
  const badge = roomTypeBadge[room.type] || { label: room.type, color: "bg-white/90 text-emerald-dark" };
  const imageUrl =
    room.images?.[0]?.asset?.url ||
    `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80`;

  return (
    <div className="group bg-white shadow-md hover:shadow-xl transition-shadow duration-500 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-emerald-dark/0 group-hover:bg-emerald-dark/40 transition-all duration-500" />
        {/* Badge */}
        <span
          className={cn(
            "absolute top-4 right-4 text-[10px] tracking-widest uppercase px-3 py-1 font-medium",
            badge.color
          )}
        >
          {badge.label}
        </span>
        {/* View Room on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/rooms/${room.slug?.current}`}
            className="bg-gold text-emerald-dark text-xs tracking-widest uppercase px-6 py-3 font-semibold flex items-center gap-2"
          >
            View Room <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-emerald-dark mb-2 font-light">
          {room.name}
        </h3>

        {/* Room specs */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          {room.bedType && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={13} className="text-gold" />
              {room.bedType}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Users size={13} className="text-gold" />
            Up to {room.maxGuests}
          </span>
          {room.squareMeters && (
            <span className="flex items-center gap-1.5">
              <Maximize2 size={13} className="text-gold" />
              {room.squareMeters}m²
            </span>
          )}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
          {room.shortDescription}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="font-serif text-2xl text-emerald font-medium">
              {formatNGN(room.pricePerNight)}
            </span>
            <span className="text-gray-400 text-xs"> / night</span>
          </div>
          <Link
            href={`/booking?roomId=${room._id}&room=${encodeURIComponent(room.name)}&price=${room.pricePerNight}`}
            className="text-xs tracking-widest uppercase text-emerald border-b border-emerald hover:text-gold hover:border-gold transition-colors pb-0.5"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
