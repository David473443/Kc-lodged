import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animations/FadeInView";

const BENEFIT_CHIPS = [
  "Best Rate Guarantee",
  "Complimentary Wi-Fi",
  "Flexible Cancellation",
];

export function BookingSection() {
  return (
    <section
      id="booking-cta"
      className="relative bg-emerald-dark text-white section-padding overflow-hidden"
    >
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-5 bg-[url('/images/pattern.png')]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <SectionHeading
          script="Reserve Your Stay"
          title="Book Direct & Save More"
          variant="light"
        />

        <FadeInView delay={0.2}>
          <p className="text-white/70 text-base leading-relaxed max-w-xl mx-auto">
            Book directly through our website and enjoy exclusive benefits
            including complimentary breakfast, early check-in, and special room
            upgrades when available.
          </p>
        </FadeInView>

        {/* Benefit chips */}
        <FadeInView delay={0.3}>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {BENEFIT_CHIPS.map((chip) => (
              <span
                key={chip}
                className="border border-gold/40 text-gold text-xs tracking-widest uppercase px-4 py-2"
              >
                {chip}
              </span>
            ))}
          </div>
        </FadeInView>

        {/* CTA buttons */}
        <FadeInView delay={0.4}>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Button variant="gold" size="lg" href="/booking">
              Book Your Room
            </Button>
            <Button variant="ghost-white" size="lg" href="tel:+2347039350238">
              Call to Reserve
            </Button>
          </div>
        </FadeInView>

        {/* Check-in info */}
        <FadeInView delay={0.5}>
          <p className="text-white/40 text-xs tracking-wider mt-6">
            Check-in from 14:00 &middot; Check-out by 12:00 &middot; No booking
            fees
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
