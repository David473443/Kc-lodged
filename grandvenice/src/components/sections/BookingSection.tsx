import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animations/FadeInView";
import { CalendarDays, BadgeCheck, Wifi } from "lucide-react";

const benefits = [
  { Icon: BadgeCheck,   label: "Best Rate Guarantee",    desc: "Always the lowest price" },
  { Icon: CalendarDays, label: "Flexible Cancellation", desc: "Free up to 24h before" },
  { Icon: Wifi,         label: "Complimentary Wi-Fi",   desc: "Throughout your stay" },
];

export function BookingSection() {
  return (
    <section id="booking-cta" className="relative z-10 overflow-hidden min-h-[680px] flex items-center">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image
          src="https://a.otcdn.com/imglib/hotelphotos/1/8/393/grandvenice-hotel-and-suites-port-harcourt-20240410141508390000.webp"
          alt="GrandVenice Hotel Exterior"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        {/* Deep obsidian overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0C0A]/95 via-[#0E0C0A]/82 to-[#0E0C0A]/55" />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-xl">

          {/* Script */}
          <FadeInView delay={0.05}>
            <span className="font-script text-[#E8D4A2] text-3xl block mb-2">Reserve Your Stay</span>
          </FadeInView>

          {/* Headline */}
          <FadeInView delay={0.15}>
            <h2 className="font-serif font-light text-[#F7F3EC] text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Book Direct.<br />
              <span className="italic">Save More.</span>
            </h2>
          </FadeInView>

          {/* Gold divider */}
          <FadeInView delay={0.2}>
            <div className="flex items-center gap-3 mb-7">
              <div className="h-px w-10 bg-[#C9A64A]/50" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A64A]/60" />
            </div>
          </FadeInView>

          {/* Description */}
          <FadeInView delay={0.25}>
            <p className="text-[#E8E3DB]/65 text-base leading-[1.8] mb-10 max-w-sm">
              Book directly through our website and enjoy exclusive benefits —
              complimentary breakfast, early check-in, and special room upgrades
              when available.
            </p>
          </FadeInView>

          {/* Benefits grid */}
          <FadeInView delay={0.35}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {benefits.map(({ Icon, label, desc }) => (
                <div
                  key={label}
                  className="border border-[#C9A64A]/30 bg-[#C9A64A]/5 hover:bg-[#C9A64A]/10 hover:border-[#C9A64A]/50 transition-all duration-300 p-4"
                >
                  <Icon size={18} className="text-[#C9A64A] mb-2" />
                  <p className="text-[#F7F3EC] text-[11px] font-semibold tracking-wide mb-0.5">{label}</p>
                  <p className="text-[#E8E3DB]/40 text-[10px] tracking-wide">{desc}</p>
                </div>
              ))}
            </div>
          </FadeInView>

          {/* CTAs */}
          <FadeInView delay={0.45}>
            <div className="flex flex-wrap gap-4">
              <Button variant="gold" size="lg" href="/booking">
                Book Your Room
              </Button>
              <Button variant="ivory" size="lg" href="tel:+2347039350238">
                Call to Reserve
              </Button>
            </div>
          </FadeInView>

          {/* Fine print */}
          <FadeInView delay={0.55}>
            <p className="text-[#E8E3DB]/22 text-[10px] tracking-wider mt-7">
              Check-in 14:00 · Check-out 12:00 · No hidden fees · Paystack secured
            </p>
          </FadeInView>
        </div>
      </div>

      {/* Right decorative element */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 opacity-20">
        <div className="h-32 w-px bg-[#C9A64A]" />
        <div className="font-serif text-[#C9A64A] text-[10px] tracking-[0.4em] uppercase rotate-90 whitespace-nowrap">
          Reserve · Experience · Return
        </div>
        <div className="h-32 w-px bg-[#C9A64A]" />
      </div>
    </section>
  );
}
