import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeInView } from "@/components/animations/FadeInView";

const stats = [
  { value: 41,  suffix: "",    label: "Rooms & Suites",     desc: "Curated accommodations" },
  { value: 10,  suffix: "+",   label: "Years of Excellence", desc: "A decade of luxury" },
  { value: 4,   suffix: ".8★", label: "Guest Rating",        desc: "Consistently outstanding" },
  { value: 24,  suffix: "/7",  label: "Concierge",           desc: "Always at your service" },
];

const marqueeItems = [
  "Luxury Redefined",
  "Port Harcourt's Finest",
  "Award-Winning Hospitality",
  "Venetian Elegance",
  "World-Class Amenities",
  "Nigerian Excellence",
];

export function WelcomeStrip() {
  return (
    <div>
      {/* ── Gold marquee ticker ── */}
      <div className="bg-gold py-2.5 overflow-hidden relative">
        <div className="marquee-wrapper">
          <div className="marquee-inner flex-shrink-0">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-5 mr-5">
                <span className="text-emerald-dark text-[10px] tracking-[0.3em] uppercase font-medium whitespace-nowrap">
                  {item}
                </span>
                <span className="text-emerald-dark/40 text-[8px]">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <section className="bg-emerald-gradient py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 relative">
            {/* Vertical dividers */}
            <div className="absolute inset-y-0 left-1/2 hidden lg:block w-px bg-white/10" />

            {stats.map((stat, i) => (
              <FadeInView key={stat.label} delay={i * 0.12} direction="up">
                <div className={`
                  flex flex-col items-center text-center py-8 px-6
                  ${i < stats.length - 1 ? "lg:border-r lg:border-white/10" : ""}
                  ${i < 2 ? "border-b lg:border-b-0 border-white/10" : ""}
                `}>
                  {/* Number */}
                  <div className="font-serif text-5xl md:text-6xl text-white font-extralight leading-none mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2500} />
                  </div>

                  {/* Gold micro-line */}
                  <div className="h-px w-8 bg-gold my-3" />

                  {/* Label */}
                  <p className="text-gold text-[10px] tracking-[0.25em] uppercase font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className="text-white/30 text-[10px] tracking-wider">
                    {stat.desc}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
