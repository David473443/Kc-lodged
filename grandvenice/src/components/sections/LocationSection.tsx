import { MapPin, Phone, Mail } from "lucide-react";
import { FadeInView } from "@/components/animations/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Button } from "@/components/ui/Button";

const LANDMARKS = [
  { name: "Shell Residential Area", distance: "5 min drive" },
  { name: "Port Harcourt City Centre", distance: "10 min drive" },
  { name: "Port Harcourt International Airport", distance: "25 min drive" },
  { name: "Trans Amadi Industrial Layout", distance: "8 min drive" },
];

export function LocationSection() {
  return (
    <section id="contact" className="bg-ivory section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          script="Find Us"
          title="Location & Directions"
          variant="dark"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map — left column */}
          <FadeInView direction="left">
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5577756!2d7.0134!3d4.8156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zGrandVenice+Hotel+and+Suites!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GrandVenice Hotel Location"
              />
            </div>
          </FadeInView>

          {/* Info — right column */}
          <FadeInView direction="right">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-serif text-emerald-dark text-lg font-light mb-1">
                    Address
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Plot 19, Igwe Family Layout Rumuogba
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Off Ecobank, Port Harcourt
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Rivers State, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-serif text-emerald-dark text-lg font-light mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+2347039350238"
                    className="text-gray-600 text-sm hover:text-gold transition-colors"
                  >
                    +234-703-935-0238
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-serif text-emerald-dark text-lg font-light mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:reservation@grandvenicenigeria.com"
                    className="text-gray-600 text-sm hover:text-gold transition-colors"
                  >
                    reservation@grandvenicenigeria.com
                  </a>
                </div>
              </div>

              <GoldDivider />

              {/* Nearby landmarks */}
              <div>
                <p className="font-serif text-emerald-dark text-lg font-light mb-4">
                  Nearby Landmarks
                </p>
                <ul className="space-y-3">
                  {LANDMARKS.map((landmark) => (
                    <li
                      key={landmark.name}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600 text-sm">
                        {landmark.name}
                      </span>
                      <span className="text-gold font-medium text-sm">
                        {landmark.distance}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Directions button */}
              <div className="pt-2">
                <Button
                  variant="emerald"
                  href="https://maps.google.com/?q=GrandVenice+Hotel+Port+Harcourt"
                  external
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
