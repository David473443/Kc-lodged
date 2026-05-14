"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { GoldDivider } from "@/components/ui/GoldDivider"
import { formatNGN, formatDate } from "@/lib/utils"

interface BookingData {
  id: string
  reference: string
  roomName: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  totalAmountNGN: number
  status: string
  paymentStatus: string
}

export function ConfirmationContent() {
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference") || searchParams.get("trxref")
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")

  useEffect(() => {
    if (!reference) { setStatus("failed"); return }
    fetch(`/api/payment/verify/${reference}`)
      .then(r => r.json())
      .then(data => {
        if (data.paymentStatus === "PAID") {
          setBooking(data)
          setStatus("success")
        } else {
          setStatus("failed")
        }
      })
      .catch(() => setStatus("failed"))
  }, [reference])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
          <p className="font-serif text-xl text-emerald-dark">Confirming your booking...</p>
        </div>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-emerald-dark mb-3">Payment Unsuccessful</h1>
          <p className="text-gray-500 mb-8">Your payment could not be confirmed. No charge has been made. Please try again or contact us.</p>
          <div className="flex gap-4 justify-center">
            <Button variant="emerald" href="/booking">Try Again</Button>
            <Button variant="ghost-emerald" href="tel:+2347039350238">Call Us</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <CheckCircle className="w-16 h-16 text-emerald mx-auto mb-4" />
          <h1 className="font-serif text-4xl text-emerald-dark font-light mb-2">Booking Confirmed!</h1>
          <p className="text-gray-500">Thank you for choosing GrandVenice Hotel & Suites</p>
        </div>

        <GoldDivider wide />

        {booking && (
          <div className="bg-white shadow-lg p-8 mt-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gold text-xs tracking-widest uppercase">Booking Reference</p>
                <p className="font-mono text-emerald-dark font-semibold text-lg mt-1">{booking.reference}</p>
              </div>
              <span className="bg-emerald/10 text-emerald text-xs font-medium px-3 py-1 tracking-wider uppercase">Confirmed</span>
            </div>

            <GoldDivider />

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Room</p>
                <p className="font-serif text-emerald-dark text-lg">{booking.roomName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Guest</p>
                <p className="font-serif text-emerald-dark text-lg">{booking.guestName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Check-in</p>
                <p className="font-serif text-emerald-dark">{formatDate(new Date(booking.checkIn))}</p>
                <p className="text-gray-400 text-xs mt-0.5">From 14:00</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Check-out</p>
                <p className="font-serif text-emerald-dark">{formatDate(new Date(booking.checkOut))}</p>
                <p className="text-gray-400 text-xs mt-0.5">By 12:00</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Duration</p>
                <p className="font-serif text-emerald-dark">{booking.nights} Night{booking.nights !== 1 ? "s" : ""}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Guests</p>
                <p className="font-serif text-emerald-dark">{booking.guests} Guest{booking.guests !== 1 ? "s" : ""}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-6 pt-6 flex justify-between items-center">
              <p className="text-gray-500 text-sm">Total Paid</p>
              <p className="font-serif text-2xl text-emerald font-medium">{formatNGN(booking.totalAmountNGN)}</p>
            </div>
          </div>
        )}

        <p className="text-center text-gray-400 text-sm mt-6">
          A confirmation email has been sent to {booking?.guestEmail}
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Button variant="emerald" href="/">Back to Home</Button>
          <Button variant="ghost-emerald" href="/rooms">Browse More Rooms</Button>
        </div>
      </div>
    </div>
  )
}
