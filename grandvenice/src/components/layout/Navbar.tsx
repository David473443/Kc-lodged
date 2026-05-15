"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Rooms",     href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Dining",    href: "#dining" },
  { label: "Gallery",   href: "#gallery" },
  { label: "Contact",   href: "#contact" },
];

export function Navbar() {
  const scrolled = useScrollProgress(60);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled
            ? "bg-white/97 backdrop-blur-xl shadow-[0_1px_0_rgba(212,175,55,0.2)]"
            : "bg-transparent"
        )}
      >
        {/* Top gold hairline */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-700",
            scrolled ? "opacity-100" : "opacity-0"
          )}
          style={{ background: "linear-gradient(90deg, transparent, #D4AF37 50%, transparent)" }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[76px] flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className={cn(
              "font-serif text-[22px] tracking-[0.18em] uppercase transition-colors duration-500",
              scrolled ? "text-emerald-dark" : "text-white"
            )}>
              GrandVenice
            </span>
            <span className={cn(
              "text-[8px] tracking-[0.45em] uppercase transition-colors duration-500 mt-0.5",
              scrolled ? "text-gold" : "text-gold/70"
            )}>
              Hotel &amp; Suites
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "gold-underline relative text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-400",
                  scrolled
                    ? "text-charcoal hover:text-gold"
                    : "text-white/75 hover:text-white"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Desktop right ── */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+2347039350238"
              className={cn(
                "flex items-center gap-2 text-[10px] tracking-wider transition-colors duration-300",
                scrolled ? "text-emerald hover:text-gold" : "text-white/60 hover:text-gold"
              )}
            >
              <Phone size={13} />
              <span className="hidden lg:inline">+234 703 935 0238</span>
            </a>
            <Button variant="gold" size="sm" href="/booking">
              Book Now
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors duration-300",
              scrolled ? "text-emerald-dark" : "text-white"
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        className={cn(
          "fixed inset-0 z-[100] md:hidden transition-all duration-500",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div className={cn(
          "absolute top-0 right-0 h-full w-[320px] bg-emerald-dark flex flex-col",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {/* Top gold line */}
          <div className="h-[1px] w-full" style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }} />

          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-white/10">
            <div>
              <span className="font-serif text-white text-xl tracking-[0.2em]">GrandVenice</span>
              <p className="text-gold text-[8px] tracking-[0.4em] uppercase mt-0.5">Hotel &amp; Suites</p>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-8 py-8 gap-1 flex-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-4 border-b border-white/5 text-white/70 hover:text-gold text-xs tracking-[0.3em] uppercase transition-colors group"
                onClick={() => setMobileOpen(false)}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {link.label}
                <span className="text-gold/30 group-hover:text-gold transition-colors">→</span>
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-white/10 space-y-4">
            <a href="tel:+2347039350238" className="flex items-center gap-3 text-white/50 text-sm hover:text-gold transition-colors">
              <Phone size={14} className="text-gold" />
              +234 703 935 0238
            </a>
            <Button variant="gold" size="md" href="/booking" className="w-full justify-center">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
