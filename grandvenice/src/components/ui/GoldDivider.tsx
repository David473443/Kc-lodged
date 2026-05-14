import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  wide?: boolean;
}

export function GoldDivider({ className, wide = false }: GoldDividerProps) {
  return (
    <div className={cn("flex items-center gap-3 my-6", className)}>
      <div className={cn("h-px bg-gold", wide ? "flex-1" : "w-12")} />
      <div className="w-1.5 h-1.5 rotate-45 bg-gold flex-shrink-0" />
      <div className={cn("h-px bg-gold", wide ? "flex-1" : "w-12")} />
    </div>
  );
}
