"use client";

import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/types";

const fallbackTestimonials: Testimonial[] = [
  {
    _id: "1",
    guestName: "Adaeze Okonkwo",
    guestLocation: "Lagos, Nigeria",
    rating: 5,
    comment: "An absolutely stunning hotel. The rooms are immaculate, service is top-notch, and the staff go above and beyond. Will definitely return for every Port Harcourt visit.",
    date: "",
    platform: "Google",
  },
  {
    _id: "2",
    guestName: "David Thompson",
    guestLocation: "London, United Kingdom",
    rating: 5,
    comment: "GrandVenice exceeded all my expectations. The luxury feel, combined with genuine Nigerian hospitality, made our stay truly unforgettable.",
    date: "",
    platform: "TripAdvisor",
  },
  {
    _id: "3",
    guestName: "Emeka Nwosu",
    guestLocation: "Abuja, Nigeria",
    rating: 5,
    comment: "Perfect location, beautiful pool, excellent food. The executive suite was outstanding value for money. Highly recommended for business travelers.",
    date: "",
    platform: "Booking.com",
  },
  {
    _id: "4",
    guestName: "Sarah Mitchell",
    guestLocation: "Houston, Texas",
    rating: 5,
    comment: "I've stayed at many luxury hotels worldwide. GrandVenice stands apart for its personalized service — the staff remembered my preferences from the very first morning.",
    date: "",
    platform: "Google",
  },
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const data = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      className="relative z-10 bg-stone-300/55 backdrop-blur-sm overflow-hidden"
    >
      {/* Soft sky radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(74,159,200,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(26,111,168,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">

        <FadeInView direction="up">
          <SectionHeading script="Guest Reviews" title="What Our Guests Say" variant="dark" />
        </FadeInView>

        <FadeInView direction="up" delay={0.2}>
          <div className="relative max-w-4xl mx-auto">

            {/* Decorative quote mark */}
            <div
              className="absolute -top-8 left-0 font-serif text-[160px] leading-none select-none pointer-events-none hidden lg:block"
              style={{ color: "rgba(74,159,200,0.10)" }}
            >
              &ldquo;
            </div>

            {/* Embla viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {data.map((t) => (
                  <div
                    key={t._id}
                    className="flex-[0_0_100%] min-w-0 px-4 md:px-8"
                  >
                    <div className="text-center pt-8">
                      {/* Gold stars */}
                      <div className="flex justify-center gap-1 mb-7">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            width="16" height="16" viewBox="0 0 24 24"
                            fill={i < t.rating ? "#B8860B" : "none"}
                            stroke="#B8860B" strokeWidth="1.5"
                            className="transition-colors"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>

                      {/* Comment */}
                      <blockquote className="font-serif text-navy text-2xl md:text-3xl lg:text-[38px] font-light italic leading-[1.55] mb-10 max-w-3xl mx-auto">
                        &ldquo;{t.comment}&rdquo;
                      </blockquote>

                      {/* Sky divider */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-12 bg-sky-200" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-sky-400" />
                        <div className="h-px w-12 bg-sky-200" />
                      </div>

                      {/* Attribution */}
                      <p className="font-serif text-navy text-lg font-light">{t.guestName}</p>
                      <div className="flex items-center justify-center gap-3 mt-1.5">
                        {t.guestLocation && (
                          <span className="text-slate text-[10px] tracking-wider">{t.guestLocation}</span>
                        )}
                        {t.platform && (
                          <>
                            <span className="text-grey-400 text-[10px]">·</span>
                            <span className="text-sky-600 text-[10px] tracking-widest uppercase">{t.platform}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-14">
              <button
                onClick={scrollPrev}
                aria-label="Previous"
                className="w-12 h-12 border border-stone-300 text-slate hover:border-sky-500 hover:text-sky-700 hover:bg-sky-50/50 flex items-center justify-center transition-all duration-300 shadow-[var(--shadow-xs)]"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {data.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      i === selectedIndex
                        ? "bg-sky-600 w-6 h-1.5"
                        : "bg-sky-200 w-1.5 h-1.5 hover:bg-sky-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={scrollNext}
                aria-label="Next"
                className="w-12 h-12 border border-stone-300 text-slate hover:border-sky-500 hover:text-sky-700 hover:bg-sky-50/50 flex items-center justify-center transition-all duration-300 shadow-[var(--shadow-xs)]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
