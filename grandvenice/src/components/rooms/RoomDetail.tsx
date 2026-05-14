"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Users,
  Maximize2,
  Eye,
  Check,
} from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Button } from "@/components/ui/Button";
import { formatNGN } from "@/lib/utils";
import type { Room } from "@/types";

interface RoomDetailProps {
  room: Room;
}

export function RoomDetail({ room }: RoomDetailProps) {
  const heroImageUrl =
    room.images?.[0]?.asset?.url ||
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80";

  const additionalImages = room.images?.slice(1) ?? [];

  return (
    <article>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src={heroImageUrl}
          alt={room.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <Link
          href="/rooms"
          className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 flex items-center gap-2 text-sm hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={16} />
          All Rooms
        </Link>

        {/* Room name + price */}
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="font-serif text-4xl text-white font-light mb-2">
            {room.name}
          </h1>
          <p className="font-serif text-2xl text-gold">
            {formatNGN(room.pricePerNight)}
            <span className="text-white/60 text-base font-sans font-light ml-2">
              / night
            </span>
          </p>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── Main content ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">
            {/* Room specs bar */}
            <div className="flex flex-wrap gap-8 pb-8 border-b border-gray-100">
              {room.bedType && (
                <div className="flex items-center gap-2 text-gray-600">
                  <BedDouble size={18} className="text-gold flex-shrink-0" />
                  <span className="text-sm">{room.bedType}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={18} className="text-gold flex-shrink-0" />
                <span className="text-sm">Up to {room.maxGuests} guests</span>
              </div>
              {room.squareMeters && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Maximize2 size={18} className="text-gold flex-shrink-0" />
                  <span className="text-sm">{room.squareMeters} m²</span>
                </div>
              )}
              {room.view && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye size={18} className="text-gold flex-shrink-0" />
                  <span className="text-sm">{room.view}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl text-emerald-dark font-light mb-4">
                About This Room
              </h2>
              {room.shortDescription && (
                <p className="text-gray-600 leading-relaxed">
                  {room.shortDescription}
                </p>
              )}
            </div>

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-emerald-dark font-light mb-6">
                  Room Amenities
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <Check size={16} className="text-gold flex-shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional image gallery */}
            {additionalImages.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-emerald-dark font-light mb-6">
                  More Photos
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {additionalImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-32 w-48 flex-shrink-0 overflow-hidden"
                    >
                      <Image
                        src={img.asset.url}
                        alt={`${room.name} — photo ${idx + 2}`}
                        fill
                        className="object-cover"
                        sizes="192px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar / booking card ────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-emerald-dark text-white p-8 sticky top-24">
              {/* Price */}
              <p className="font-serif text-4xl text-white mb-1">
                {formatNGN(room.pricePerNight)}
              </p>
              <p className="text-white/60 text-sm mb-4">per night</p>

              <GoldDivider />

              {/* Room specs summary */}
              <ul className="space-y-3 my-6">
                {room.maxGuests && (
                  <li className="flex justify-between text-sm">
                    <span className="text-white/60">Max Guests</span>
                    <span className="text-white">{room.maxGuests}</span>
                  </li>
                )}
                {room.bedType && (
                  <li className="flex justify-between text-sm">
                    <span className="text-white/60">Bed Type</span>
                    <span className="text-white">{room.bedType}</span>
                  </li>
                )}
                {room.squareMeters && (
                  <li className="flex justify-between text-sm">
                    <span className="text-white/60">Room Size</span>
                    <span className="text-white">{room.squareMeters} m²</span>
                  </li>
                )}
              </ul>

              {/* Book Now */}
              <Button
                variant="gold"
                size="lg"
                href={`/booking?roomId=${room._id}&room=${encodeURIComponent(room.name)}&price=${room.pricePerNight}`}
                className="w-full justify-center"
              >
                Book Now
              </Button>

              {/* Call to enquire */}
              <a
                href="tel:+2347039350238"
                className="block text-center text-white/70 hover:text-gold text-sm mt-4 transition-colors"
              >
                Call to enquire
              </a>

              {/* Best rate note */}
              <p className="text-white/40 text-xs text-center mt-4 leading-relaxed">
                Best rate guaranteed when booking direct
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
