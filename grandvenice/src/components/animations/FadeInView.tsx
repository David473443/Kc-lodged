"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInViewProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionMap = {
  up:    { y: 40, x: 0 },
  down:  { y: -40, x: 0 },
  left:  { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none:  { x: 0, y: 0 },
};

export function FadeInView({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className,
  once = true,
}: FadeInViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
