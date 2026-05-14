"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Dining", href: "#dining" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const scrolled = useScrollProgress(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span
              className={cn(
                "font-serif text-xl tracking-[0.2em] uppercase transition-colors duration-300",
                scrolled ? "text-emerald-dark" : "text-white"
              )}
            >
              GrandVenice
            </span>
            <span
              className={cn(
                "text-[9px] tracking-[0.35em] uppercase transition-colors duration-300",
                scrolled ? "text-emerald/60" : "text-white/60"
              )}
            >
              Hotel & Suites
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300",
                  "hover:text-gold",
                  scrolled ? "text-emerald-dark" : "text-white/80"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+2347039350238"
              className={cn(
                "flex items-center gap-2 text-xs transition-colors duration-300",
                scrolled ? "text-emerald" : "text-white/70",
                "hover:text-gold"
              )}
            >
              <Phone size={14} />
              <span className="hidden lg:inline">+234-703-935-0238</span>
            </a>
            <Button variant="gold" size="sm" href="/booking">
              Book Now
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors duration-300",
              scrolled ? "text-emerald-dark" : "text-white"
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[100] transition-opacity duration-300 md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 bg-emerald-dark flex flex-col",
            "transition-transform duration-400 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <span className="font-serif text-white text-xl tracking-widest">
              GrandVenice
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-6 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-gold text-sm tracking-widest uppercase transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="p-6 border-t border-white/10 space-y-4">
            <a
              href="tel:+2347039350238"
              className="flex items-center gap-3 text-white/70 text-sm"
            >
              <Phone size={16} className="text-gold" />
              +234-703-935-0238
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
