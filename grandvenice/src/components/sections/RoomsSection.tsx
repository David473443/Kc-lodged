import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoomsGrid } from "@/components/rooms/RoomsGrid";
import type { Room } from "@/types";

interface RoomsSectionProps {
  rooms: Room[];
}

export async function RoomsSection({ rooms }: RoomsSectionProps) {
  return (
    <section id="rooms" className="relative z-10 overflow-hidden section-padding bg-[#141210]">

      {/* ── Antique gold accent hairline top ── */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A64A 40%, #C9A64A 60%, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6">
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

      {/* ── Antique gold accent hairline bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A64A 40%, #C9A64A 60%, transparent)" }} />
    </section>
  );
}
