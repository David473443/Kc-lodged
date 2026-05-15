import Image from "next/image";
import { FadeInView } from "@/components/animations/FadeInView";
import { Button } from "@/components/ui/Button";
import type { HotelInfo } from "@/types";

interface AboutSectionProps {
  hotelInfo?: HotelInfo | null;
}

const details = [
  { label: "Check-in",  value: "From 14:00" },
  { label: "Check-out", value: "By 12:00" },
  { label: "Location",  value: "Port Harcourt" },
  { label: "Rating",    value: "3-Star Luxury" },
];

export function AboutSection({ hotelInfo }: AboutSectionProps) {
  const imageUrl =
    hotelInfo?.aboutImageUrl ||
    "https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141140339900.webp";

  return (
    <section id="about" className="relative bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[700px]">

          {/* ── Image column ── */}
          <FadeInView direction="left" className="relative lg:min-h-[700px]">
            {/* Decorative section number */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-2">
              <div className="h-16 w-px bg-gold/40" />
              <span className="font-serif text-[11px] tracking-[0.3em] text-gold/50 rotate-90 whitespace-nowrap">
                01 — Our Story
              </span>
              <div className="h-16 w-px bg-gold/40" />
            </div>

            <div className="relative h-full min-h-[480px] lg:min-h-[700px]">
              <Image
                src={imageUrl}
                alt="GrandVenice Hotel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Subtle emerald tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/40 via-transparent to-transparent" />

              {/* Gold border frame inset */}
              <div className="absolute inset-6 border border-gold/20 pointer-events-none z-10" />

              {/* Floating award badge */}
              <div className="absolute bottom-10 left-8 z-20 bg-emerald-dark border border-gold/30 p-6 shadow-2xl">
                <p className="font-script text-gold text-2xl leading-none mb-1">Award Winning</p>
                <div className="h-px w-full bg-gold/20 my-2" />
                <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase">
                  Port Harcourt's Choice
                </p>
              </div>
            </div>
          </FadeInView>

          {/* ── Text column ── */}
          <div className="lg:pl-20 py-16 lg:py-24 flex flex-col justify-center">
            <FadeInView delay={0.1}>
              <span className="font-script text-emerald text-3xl">Our Story</span>
            </FadeInView>

            <FadeInView delay={0.2}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[52px] font-light text-emerald-dark leading-[1.1] mt-3 mb-7">
                {hotelInfo?.aboutTitle || <>A Legacy of Luxury<br />in Port Harcourt</>}
              </h2>
            </FadeInView>

            {/* Gold divider with diamond */}
            <FadeInView delay={0.25}>
              <div className="flex items-center gap-4 mb-7">
                <div className="h-px w-12 bg-gold" />
                <div className="w-2 h-2 rotate-45 bg-gold" />
                <div className="h-px w-12 bg-gold/30" />
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <p className="text-muted leading-[1.85] text-base mb-5">
                GrandVenice Hotel and Suites is a friendly and luxury
                accommodation provider located in the heart of Port Harcourt,
                Rivers State, Nigeria. We offer outstanding service and comfort
                with the personal touch — a place where business and leisure
                travellers find an exquisite home away from home.
              </p>
            </FadeInView>

            <FadeInView delay={0.4}>
              <p className="text-muted leading-[1.85] text-base mb-10">
                Strategically situated in a serene neighbourhood with proximity
                to the Shell residential area and the commercial and business
                districts, GrandVenice provides the perfect base for exploring
                Nigeria&apos;s Garden City.
              </p>
            </FadeInView>

            {/* Details grid */}
            <FadeInView delay={0.5}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-10">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <div className="w-px h-10 bg-gold flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[10px] text-gold tracking-[0.25em] uppercase mb-0.5">
                        {d.label}
                      </p>
                      <p className="font-serif text-emerald-dark text-lg font-light">
                        {d.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>

            <FadeInView delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <Button variant="emerald" href="/booking">Book Your Stay</Button>
                <Button variant="ghost-emerald" href="#amenities">Our Amenities</Button>
              </div>
            </FadeInView>
          </div>

        </div>
      </div>
    </section>
  );
}
