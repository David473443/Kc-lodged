"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-[#0f2419] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl tracking-widest mb-1">GrandVenice</h3>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-5">
              Hotel & Suites
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Port Harcourt&apos;s premier luxury destination. Offering
              outstanding service and comfort with the personal touch.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/grandveniceportharcourt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="YouTube"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.25em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Rooms & Suites", href: "#rooms" },
                { label: "Amenities", href: "#amenities" },
                { label: "Dining", href: "#dining" },
                { label: "Gallery", href: "#gallery" },
                { label: "Book a Room", href: "/booking" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.25em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/60 text-sm leading-relaxed">
                  Plot 19, Igwe Family Layout Rumuogba,<br />
                  Off Ecobank, Port Harcourt,<br />
                  Rivers State, Nigeria
                </p>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a
                  href="tel:+2347039350238"
                  className="text-white/60 hover:text-gold text-sm transition-colors"
                >
                  +234-703-935-0238
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a
                  href="mailto:reservation@grandvenicenigeria.com"
                  className="text-white/60 hover:text-gold text-sm transition-colors"
                >
                  reservation@grandvenicenigeria.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.25em] uppercase mb-5">
              Stay Updated
            </h4>
            <p className="text-white/60 text-sm mb-4">
              Subscribe for exclusive offers and luxury travel updates.
            </p>
            {subscribed ? (
              <p className="text-emerald-pale text-sm">
                ✓ Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  loading={loading}
                  className="w-full justify-center"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        <GoldDivider wide />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
          <p className="text-white/40 text-xs tracking-wide">
            © {new Date().getFullYear()} GrandVenice Hotel & Suites Ltd. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Plot 19, Igwe Family Layout Rumuogba, Port Harcourt, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
