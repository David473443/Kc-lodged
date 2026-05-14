"use client";

import { motion, type Variants } from "framer-motion";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { RoomCard } from "@/components/rooms/RoomCard";
import type { Room } from "@/types";

interface RoomsGridProps {
  rooms: Room[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export function RoomsGrid({ rooms }: RoomsGridProps) {
  return (
    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((room) => (
        <motion.div key={room._id} variants={cardVariants}>
          <RoomCard room={room} />
        </motion.div>
      ))}
    </StaggerChildren>
  );
}
