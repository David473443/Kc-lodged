import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: 12, md: 16, lg: 20 };

export function StarRating({
  rating,
  max = 5,
  size = "md",
  className,
}: StarRatingProps) {
  const px = sizes[size];
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={px}
          className={
            i < rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}
