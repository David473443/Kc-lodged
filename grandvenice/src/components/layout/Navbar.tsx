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
  const scrolled = useScrollProgress(20);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#0E0C0A]/97 backdrop-blur-lg border-b border-[#C9A64A]/20 shadow-[0_2px_24px_rgba(0,0,0,0.40)]"
            : "bg-transparent border-b border-[#F7F3EC]/8"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex flex-col leading-none group flex-shrink-0">
            <span className="font-serif text-[24px] tracking-[0.22em] uppercase text-[#F7F3EC] transition-colors duration-300 group-hover:text-[#C9A64A]">
              GrandVenice
            </span>
            <span className="text-[8px] tracking-[0.55em] uppercase text-[#C9A64A] mt-0.5 font-sans">
              Hotel &amp; Suites
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="gold-underline text-[10px] tracking-[0.25em] uppercase font-medium text-[#E8E3DB]/60 hover:text-[#C9A64A] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Desktop right ── */}
          <div className="hidden md:flex items-center gap-6 flex-shrink-0">
            <a
              href="tel:+2347039350238"
              className="flex items-center gap-2 text-[10px] tracking-wider text-[#E8E3DB]/50 hover:text-[#C9A64A] transition-colors duration-300"
            >
              <Phone size={13} className="text-[#C9A64A]" />
              <span className="hidden lg:inline">+234 703 935 0238</span>
            </a>
            <Button variant="gold" size="sm" href="/booking">
              Book Now
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 text-[#F7F3EC] hover:text-[#C9A64A] transition-colors duration-300"
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
          className="absolute inset-0 bg-[#0E0C0A]/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div className={cn(
          "absolute top-0 right-0 h-full w-[320px] bg-[#141210] flex flex-col",
          "shadow-[-8px_0_40px_rgba(0,0,0,0.50)]",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {/* Top gold accent line */}
          <div className="h-[2px] w-full bg-[#C9A64A]" />

          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2520]">
            <div>
              <span className="font-serif text-[#F7F3EC] text-xl tracking-[0.22em]">GrandVenice</span>
              <p className="text-[#C9A64A] text-[8px] tracking-[0.5em] uppercase mt-0.5 font-sans">Hotel &amp; Suites</p>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 flex items-center justify-center text-[#E8E3DB]/60 hover:text-[#C9A64A] border border-[#2A2520] hover:border-[#C9A64A]/50 transition-all"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-8 py-6 gap-0 flex-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-5 border-b border-[#2A2520] text-[#E8E3DB]/60 hover:text-[#C9A64A] text-[10px] tracking-[0.3em] uppercase transition-colors group"
                onClick={() => setMobileOpen(false)}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {link.label}
                <span className="text-[#2A2520] group-hover:text-[#C9A64A] transition-colors text-sm">→</span>
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-[#2A2520] space-y-4">
            <a href="tel:+2347039350238" className="flex items-center gap-3 text-[#E8E3DB]/60 text-sm hover:text-[#C9A64A] transition-colors">
              <Phone size={14} className="text-[#C9A64A]" />
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
