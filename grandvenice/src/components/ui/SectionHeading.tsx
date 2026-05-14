import { cn } from "@/lib/utils";
import { FadeInView } from "@/components/animations/FadeInView";

interface SectionHeadingProps {
  script?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  variant?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  script,
  title,
  subtitle,
  align = "center",
  variant = "dark",
  className,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  const isLight = variant === "light";

  return (
    <div className={cn("flex flex-col gap-3 mb-14", alignClass, className)}>
      {script && (
        <FadeInView delay={0.1}>
          <p
            className={cn(
              "font-script text-2xl md:text-3xl",
              isLight ? "text-gold" : "text-emerald"
            )}
          >
            {script}
          </p>
        </FadeInView>
      )}
      <FadeInView delay={0.2}>
        <h2
          className={cn(
            "font-serif font-light text-3xl md:text-5xl leading-tight tracking-wide",
            isLight ? "text-white" : "text-emerald-dark"
          )}
        >
          {title}
        </h2>
      </FadeInView>
      {subtitle && (
        <FadeInView delay={0.3}>
          <p
            className={cn(
              "text-sm md:text-base leading-relaxed max-w-2xl",
              isLight ? "text-white/70" : "text-gray-500"
            )}
          >
            {subtitle}
          </p>
        </FadeInView>
      )}
      <FadeInView delay={0.35}>
        <div
          className={cn(
            "h-px w-16",
            isLight ? "bg-gold" : "bg-gold"
          )}
        />
      </FadeInView>
    </div>
  );
}
