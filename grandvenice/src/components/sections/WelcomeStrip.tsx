import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeInView } from "@/components/animations/FadeInView";
import { GoldDivider } from "@/components/ui/GoldDivider";

const stats = [
  { value: 41, suffix: "", label: "Rooms & Suites" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
  { value: 4, suffix: ".0★", label: "Guest Rating" },
  { value: 24, suffix: "/7", label: "Concierge Service" },
];

export function WelcomeStrip() {
  return (
    <section className="bg-emerald-dark py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y-2 divide-white/10 lg:divide-y-0 lg:divide-x lg:divide-white/20">
          {stats.map((stat, i) => (
            <FadeInView key={stat.label} delay={i * 0.1} direction="up">
              <div className="flex flex-col items-center text-center py-4 lg:py-0 lg:px-10">
                <span className="font-serif text-4xl md:text-5xl text-white font-light">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2200}
                  />
                </span>
                <GoldDivider className="my-2" />
                <span className="text-white/60 text-xs tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
