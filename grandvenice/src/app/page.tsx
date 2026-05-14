import { client } from "@/lib/sanity/client"
import { ROOMS_QUERY, GALLERY_QUERY, TESTIMONIALS_QUERY, HOTEL_INFO_QUERY } from "@/lib/sanity/queries"
import { HeroSection } from "@/components/sections/HeroSection"
import { WelcomeStrip } from "@/components/sections/WelcomeStrip"
import { AboutSection } from "@/components/sections/AboutSection"
import { RoomsSection } from "@/components/sections/RoomsSection"
import { AmenitiesSection } from "@/components/sections/AmenitiesSection"
import { DiningSection } from "@/components/sections/DiningSection"
import { GallerySection } from "@/components/sections/GallerySection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { LocationSection } from "@/components/sections/LocationSection"
import { BookingSection } from "@/components/sections/BookingSection"

export const revalidate = 3600

async function safeFetch<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise
  } catch {
    return fallback
  }
}

export default async function HomePage() {
  const sanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  const [rooms, galleryRaw, testimonials, hotelInfo] = sanityConfigured
    ? await Promise.all([
        safeFetch(client.fetch(ROOMS_QUERY, {}, { next: { revalidate: 3600 } }), []),
        safeFetch(client.fetch(GALLERY_QUERY, {}, { next: { revalidate: 3600 } }), []),
        safeFetch(client.fetch(TESTIMONIALS_QUERY, {}, { next: { revalidate: 3600 } }), []),
        safeFetch(client.fetch(HOTEL_INFO_QUERY, {}, { next: { revalidate: 3600 } }), null),
      ])
    : [[], [], [], null]

  // GALLERY_QUERY returns { imageUrl: string } but GallerySection expects { image: { asset: { url: string } } }
  // Transform it:
  const gallery = (galleryRaw || []).map((item: { _id: string; altText: string; category: string; imageUrl: string; aiGenerated?: boolean }) => ({
    _id: item._id,
    altText: item.altText,
    category: item.category,
    aiGenerated: item.aiGenerated,
    image: { asset: { url: item.imageUrl } },
  }))

  return (
    <>
      <HeroSection hotelInfo={hotelInfo} />
      <WelcomeStrip />
      <AboutSection hotelInfo={hotelInfo} />
      <RoomsSection rooms={rooms || []} />
      <AmenitiesSection />
      <DiningSection />
      <GallerySection items={gallery} />
      <TestimonialsSection testimonials={testimonials || []} />
      <LocationSection />
      <BookingSection />
    </>
  )
}
