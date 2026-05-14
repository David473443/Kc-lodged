import { Suspense } from "react"
import { client } from "@/lib/sanity/client"
import { ROOMS_QUERY } from "@/lib/sanity/queries"
import { BookingForm } from "@/components/booking/BookingForm"
import { SectionHeading } from "@/components/ui/SectionHeading"
import type { Room } from "@/types"

export const metadata = {
  title: "Book Your Stay",
  description: "Reserve your room at GrandVenice Hotel & Suites, Port Harcourt.",
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ roomId?: string; room?: string; price?: string }>
}) {
  const sp = await searchParams
  const rooms: Room[] = await client.fetch(ROOMS_QUERY, {}, { next: { revalidate: 3600 } })

  return (
    <div className="bg-ivory min-h-screen pt-24 pb-16">
      {/* Page header */}
      <div className="max-w-4xl mx-auto px-6 mb-10 text-center">
        <SectionHeading
          script="Reserve"
          title="Book Your Stay"
          subtitle="Complete your reservation in a few simple steps"
        />
      </div>

      {/* Booking form */}
      <div className="max-w-3xl mx-auto px-6">
        <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
          <BookingForm
            rooms={rooms}
            initialRoomId={sp.roomId}
            initialRoomName={sp.room ? decodeURIComponent(sp.room) : undefined}
            initialPrice={sp.price ? parseInt(sp.price) : undefined}
          />
        </Suspense>
      </div>
    </div>
  )
}
