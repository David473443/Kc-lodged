"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import type { Testimonial } from "@/types";

const fallbackTestimonials: Testimonial[] = [
  {
    _id: "1",
    guestName: "Adaeze Okonkwo",
    guestLocation: "Lagos, Nigeria",
    rating: 5,
    comment:
      "An absolutely stunning hotel. The rooms are immaculate, service is top-notch, and the staff go above and beyond. Will definitely return!",
    date: "",
    platform: "Google",
  },
  {
    _id: "2",
    guestName: "David Thompson",
    guestLocation: "London, UK",
    rating: 5,
    comment:
      "GrandVenice exceeded all expectations. The luxury feel, combined with genuine Nigerian hospitality, made our stay truly memorable.",
    date: "",
    platform: "TripAdvisor",
  },
  {
    _id: "3",
    guestName: "Emeka Nwosu",
    guestLocation: "Abuja, Nigeria",
    rating: 4,
    comment:
      "Perfect location, beautiful pool, excellent food. The executive suite was outstanding value for money. Highly recommended for business travelers.",
    date: "",
    platform: "Booking.com",
  },
  {
    _id: "4",
    guestName: "Sarah Mitchell",
    guestLocation: "Houston, TX",
    rating: 5,
    comment:
      "I've stayed at many luxury hotels worldwide, and GrandVenice stands out for its personalized service. The staff remembered my preferences from day one.",
    date: "",
    platform: "Google",
  },
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const data =
    testimonials && testimonials.length > 0
      ? testimonials
      : fallbackTestimonials;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Auto-play every 4 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section id="testimonials" className="bg-ivory section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInView direction="up">
          <SectionHeading
            script="Guest Reviews"
            title="What Our Guests Say"
          />
        </FadeInView>

        <FadeInView direction="up" delay={0.2}>
          <div className="relative">
            {/* Carousel viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {data.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                  >
                    <div className="bg-white shadow-md p-8 h-full flex flex-col">
                      {/* Large quote mark */}
                      <div className="font-serif text-6xl text-gold/20 leading-none select-none mb-2">
                        &ldquo;
                      </div>

                      <StarRating rating={testimonial.rating} className="mb-4" />

                      <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-6">
                        {testimonial.comment}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div>
                          <p className="font-serif text-emerald-dark text-base">
                            {testimonial.guestName}
                          </p>
                          {testimonial.guestLocation && (
                            <p className="text-gray-400 text-xs mt-0.5">
                              {testimonial.guestLocation}
                            </p>
                          )}
                        </div>
                        {testimonial.platform && (
                          <span className="text-[10px] tracking-widest uppercase px-3 py-1 border border-gold/30 text-gold">
                            {testimonial.platform}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md border border-gold/20 flex items-center justify-center text-emerald-dark hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md border border-gold/20 flex items-center justify-center text-emerald-dark hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
