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

  // "light" variant = on dark/charcoal sections (ivory text, gold-light script)
  // "dark" variant  = on ivory/light sections (charcoal text, gold-dark script)
  const isLight = variant === "light";

  return (
    <div className={cn("flex flex-col gap-4 mb-16", alignClass, className)}>
      {script && (
        <FadeInView delay={0.05}>
          <p
            className={cn(
              "font-script text-3xl md:text-4xl lg:text-5xl leading-none",
              isLight ? "text-[#E8D4A2]" : "text-[#9B7A23]"
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
            isLight ? "text-[#F7F3EC]" : "text-[#1A1614]"
          )}
        >
          {title}
        </h2>
      </FadeInView>

      {/* Ornament divider */}
      <FadeInView delay={0.25}>
        <div className={cn("flex items-center gap-3 mt-1", align === "center" ? "justify-center" : align === "right" ? "justify-end" : "")}>
          <div className={cn("h-px w-14", isLight ? "bg-[#C9A64A]/60" : "bg-[#9B7A23]/50")} />
          <div className={cn("w-1.5 h-1.5 rotate-45 flex-shrink-0", isLight ? "bg-[#E8D4A2]" : "bg-[#C9A64A]")} />
          <div className={cn("h-px w-5", isLight ? "bg-[#C9A64A]/35" : "bg-[#9B7A23]/30")} />
        </div>
      </FadeInView>

      {subtitle && (
        <FadeInView delay={0.3}>
          <p
            className={cn(
              "text-base md:text-lg leading-[1.8] max-w-2xl mt-2",
              isLight ? "text-[#E8E3DB]/70 font-sans font-light" : "text-[#5C5450] font-sans font-light"
            )}
          >
            {subtitle}
          </p>
        </FadeInView>
      )}
    </div>
  );
}
