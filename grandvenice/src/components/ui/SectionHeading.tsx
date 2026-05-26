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
    <div className={cn("flex flex-col gap-4 mb-16", alignClass, className)}>
      {script && (
        <FadeInView delay={0.05}>
          <p
            className={cn(
              "font-script text-3xl md:text-4xl lg:text-5xl leading-none",
              isLight ? "text-gold-light" : "text-sky-500"
            )}
          >
            {script}
          </p>
        </FadeInView>
      )}

      <FadeInView delay={0.15}>
        <h2
          className={cn(
            "font-serif font-light leading-[1.05] tracking-wide",
            "text-5xl md:text-6xl lg:text-[70px]",
            isLight ? "text-white" : "text-navy"
          )}
        >
          {title}
        </h2>
      </FadeInView>

      {/* Ornament divider */}
      <FadeInView delay={0.25}>
        <div className={cn("flex items-center gap-3 mt-1", align === "center" ? "justify-center" : align === "right" ? "justify-end" : "")}>
          <div className={cn("h-px w-14", isLight ? "bg-gold/50" : "bg-sky-300/70")} />
          <div className={cn("w-1.5 h-1.5 rotate-45 flex-shrink-0", isLight ? "bg-gold-light" : "bg-sky-400")} />
          <div className={cn("h-px w-5", isLight ? "bg-gold/30" : "bg-sky-200/60")} />
        </div>
      </FadeInView>

      {subtitle && (
        <FadeInView delay={0.3}>
          <p
            className={cn(
              "text-base md:text-lg leading-[1.8] max-w-2xl mt-2",
              isLight ? "text-white/70 font-sans font-light" : "text-slate font-sans font-light"
            )}
          >
            {subtitle}
          </p>
        </FadeInView>
      )}
    </div>
  );
}
