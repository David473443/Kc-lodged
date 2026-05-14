import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoomsGrid } from "@/components/rooms/RoomsGrid";
import type { Room } from "@/types";

interface RoomsSectionProps {
  rooms: Room[];
}

export async function RoomsSection({ rooms }: RoomsSectionProps) {
  return (
    <section id="rooms" className="bg-ivory section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInView direction="up">
          <SectionHeading
            script="Accommodations"
            title="Rooms & Suites"
            subtitle="Each room tells a story of comfort and elegance"
          />
        </FadeInView>

        {/* StaggerChildren + RoomCard grid via RoomsGrid client component */}
        <RoomsGrid rooms={rooms} />
      </div>
    </section>
  );
}
