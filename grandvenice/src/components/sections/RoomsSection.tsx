import Image from "next/image";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoomsGrid } from "@/components/rooms/RoomsGrid";
import type { Room } from "@/types";

interface RoomsSectionProps {
  rooms: Room[];
}

export async function RoomsSection({ rooms }: RoomsSectionProps) {
  return (
    <section id="rooms" className="relative overflow-hidden section-padding">

      {/* ── Hotel exterior as full-bleed background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141508390000.webp"
          alt="GrandVenice Hotel"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Multi-layer dark overlay */}
        <div className="absolute inset-0 bg-obsidian/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/80 to-obsidian" />
      </div>

      {/* ── Decorative gold line top ── */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C 40%, #C9A84C 60%, transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeInView direction="up">
          <SectionHeading
            script="Accommodations"
            title="Rooms & Suites"
            subtitle="Each room tells a story of comfort and elegance"
            variant="light"
          />
        </FadeInView>

        <RoomsGrid rooms={rooms} />
      </div>

      {/* ── Decorative gold line bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C 40%, #C9A84C 60%, transparent)" }} />
    </section>
  );
}
