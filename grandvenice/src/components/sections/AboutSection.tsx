import Image from "next/image";
import { FadeInView } from "@/components/animations/FadeInView";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Button } from "@/components/ui/Button";
import type { HotelInfo } from "@/types";

interface AboutSectionProps {
  hotelInfo?: HotelInfo | null;
}

export function AboutSection({ hotelInfo }: AboutSectionProps) {
  const imageUrl =
    hotelInfo?.aboutImageUrl ||
    "https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141140339900.webp";

  return (
    <section id="about" className="section-padding bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <FadeInView direction="left" className="relative">
            <div className="relative h-[500px] lg:h-[620px]">
              <Image
                src={imageUrl}
                alt="GrandVenice Hotel Exterior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gold accent border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/40 pointer-events-none" />
            </div>

            {/* Floating award badge */}
            <div className="absolute bottom-8 left-8 bg-emerald-dark text-white p-5 shadow-xl">
              <p className="font-script text-gold text-2xl">Award Winning</p>
              <p className="text-white/70 text-xs tracking-widest uppercase mt-1">
                Port Harcourt&apos;s Choice
              </p>
            </div>
          </FadeInView>

          {/* Text side */}
          <div className="space-y-6">
            <FadeInView delay={0.1}>
              <p className="font-script text-emerald text-2xl md:text-3xl">
                Our Story
              </p>
            </FadeInView>

            <FadeInView delay={0.2}>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-emerald-dark leading-tight">
                {hotelInfo?.aboutTitle ||
                  "A Legacy of Luxury in Port Harcourt"}
              </h2>
            </FadeInView>

            <GoldDivider />

            <FadeInView delay={0.3}>
              <p className="text-gray-600 leading-relaxed text-base">
                GrandVenice Hotel and Suites is a friendly and luxury
                accommodation provider located in the heart of Port Harcourt,
                Rivers State, Nigeria. We offer outstanding service and comfort
                with the personal touch — a place where business and leisure
                travellers find an exquisite home away from home.
              </p>
            </FadeInView>

            <FadeInView delay={0.4}>
              <p className="text-gray-600 leading-relaxed text-base">
                Strategically situated in a serene neighbourhood with proximity
                to the Shell residential area and the commercial and business
                districts of Port Harcourt, GrandVenice provides the perfect
                base for exploring Nigeria&apos;s Garden City.
              </p>
            </FadeInView>

            <FadeInView delay={0.5}>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: "Check-in", value: "From 14:00" },
                  { label: "Check-out", value: "By 12:00" },
                  { label: "Location", value: "Port Harcourt" },
                  { label: "Classification", value: "3-Star Luxury" },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-gold pl-4">
                    <p className="text-xs text-gold tracking-widest uppercase">
                      {item.label}
                    </p>
                    <p className="font-serif text-emerald-dark text-lg mt-1">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </FadeInView>

            <FadeInView delay={0.6}>
              <div className="flex gap-4 pt-2">
                <Button variant="emerald" href="/booking">
                  Book Your Stay
                </Button>
                <Button variant="ghost-emerald" href="#amenities">
                  Our Amenities
                </Button>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
