import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway, Great_Vibes } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grandvenicenigeria.com"),
  title: {
    default: "GrandVenice Hotel & Suites | Port Harcourt, Nigeria",
    template: "%s | GrandVenice Hotel",
  },
  description:
    "Experience luxury at GrandVenice Hotel & Suites in Port Harcourt, Nigeria. 41 elegant rooms, outdoor pool, gym, fine dining, and business facilities. Book direct and save.",
  keywords: [
    "luxury hotel port harcourt",
    "grandvenice hotel nigeria",
    "hotel port harcourt rivers state",
    "best hotel port harcourt",
    "grandvenice suites",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://grandvenicenigeria.com",
    siteName: "GrandVenice Hotel & Suites",
    title: "GrandVenice Hotel & Suites | Port Harcourt, Nigeria",
    description:
      "Port Harcourt's premier luxury destination. 41 elegantly appointed rooms, world-class amenities, and impeccable service.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GrandVenice Hotel & Suites Port Harcourt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GrandVenice Hotel & Suites | Port Harcourt",
    description: "Port Harcourt's premier luxury hotel. Book direct and save.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${raleway.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-obsidian text-charcoal flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
