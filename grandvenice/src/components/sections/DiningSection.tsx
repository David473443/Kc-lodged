import Image from "next/image";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const hours = [
  { meal: "Breakfast", time: "6:30 AM – 10:30 AM" },
  { meal: "Lunch", time: "12:00 PM – 3:00 PM" },
  { meal: "Dinner", time: "6:30 PM – 10:30 PM" },
];

export async function DiningSection() {
  return (
    <section id="dining" className="bg-ivory section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <SectionHeading
              script="Culinary Excellence"
              title="The GrandVenice Restaurant"
              subtitle="A gastronomic journey"
              align="left"
            />

            <FadeInView delay={0.2}>
              <p className="text-gray-600 leading-relaxed text-base mb-4">
                Experience culinary artistry at its finest at our signature
                restaurant. Our talented chefs craft exquisite dishes inspired
                by international flavors, using the finest local and imported
                ingredients.
              </p>
            </FadeInView>

            <FadeInView delay={0.3}>
              <p className="text-gray-600 leading-relaxed text-base">
                Whether you&apos;re joining us for an intimate breakfast, a
                business lunch, or a romantic dinner, our restaurant provides an
                unparalleled dining experience in an elegant setting.
              </p>
            </FadeInView>

            {/* Opening hours */}
            <FadeInView delay={0.4}>
              <div className="bg-white border border-gold/20 p-6 mt-6">
                <p className="text-gold text-xs tracking-widest uppercase mb-4">
                  Opening Hours
                </p>
                <ul className="space-y-3">
                  {hours.map(({ meal, time }) => (
                    <li key={meal} className="flex justify-between">
                      <span className="text-gray-500 text-sm">{meal}</span>
                      <span className="font-serif text-emerald-dark">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>

            <FadeInView delay={0.5}>
              <div className="mt-8">
                <Button variant="emerald" href="/booking">
                  Reserve a Table
                </Button>
              </div>
            </FadeInView>
          </div>

          {/* Image side */}
          <FadeInView direction="right">
            <div className="relative h-[500px]">
              <Image
                src="/images/amenities/restaurant.jpg"
                alt="GrandVenice Restaurant"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gold offset border */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold/40 pointer-events-none" />
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
