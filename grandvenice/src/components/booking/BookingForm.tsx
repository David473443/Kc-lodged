"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingSchema } from "@/lib/validations"
import { Button } from "@/components/ui/Button"
import { DateRangePicker } from "@/components/booking/DateRangePicker"
import { formatNGN, calculateNights, formatShortDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { Room, BookingFormData } from "@/types"
import type { BookingInput } from "@/lib/validations"
import { Users, BedDouble, Minus, Plus } from "lucide-react"

interface BookingFormProps {
  rooms: Room[]
  initialRoomId?: string
  initialRoomName?: string
  initialPrice?: number
}

const STEP_LABELS = ["Room", "Dates", "Details", "Payment"] as const

export function BookingForm({
  rooms,
  initialRoomId,
  initialRoomName,
  initialPrice,
}: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    roomId: initialRoomId,
    roomName: initialRoomName,
    pricePerNight: initialPrice,
    guests: 1,
  })
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      roomId: initialRoomId ?? "",
      roomName: initialRoomName ?? "",
      roomType: "",
      pricePerNight: initialPrice ?? 0,
      guests: 1,
      checkIn: "",
      checkOut: "",
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      specialRequests: "",
    },
  })

  // ─── Derived values ───────────────────────────────────────────────────────

  const selectedRoom = rooms.find((r) => r._id === formData.roomId)
  const nights =
    checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0
  const totalPrice = nights * (formData.pricePerNight ?? 0)

  // ─── Step indicator ───────────────────────────────────────────────────────

  function StepIndicator() {
    return (
      <div className="flex items-center justify-center mb-10">
        {STEP_LABELS.map((label, idx) => {
          const num = idx + 1
          const isCompleted = step > num
          const isActive = step === num

          return (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted
                      ? "bg-gold text-emerald-dark"
                      : isActive
                      ? "bg-emerald-dark text-white"
                      : "border border-gray-200 text-gray-400 bg-white"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    num
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] tracking-widest uppercase",
                    isActive
                      ? "text-emerald-dark font-semibold"
                      : isCompleted
                      ? "text-gold"
                      : "text-gray-400"
                  )}
                >
                  {label}
                </span>
              </div>

              {idx < STEP_LABELS.length - 1 && (
                <div
                  className={cn(
                    "h-px w-12 md:w-20 mx-2 mb-5 transition-all duration-300",
                    step > num ? "bg-gold" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // ─── Step 1: Room Selection ───────────────────────────────────────────────

  function Step1() {
    return (
      <div>
        <h2 className="font-serif text-2xl text-emerald-dark mb-6 font-light">
          Select Your Room
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          {rooms.map((room) => {
            const isSelected = formData.roomId === room._id
            return (
              <button
                key={room._id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    roomId: room._id,
                    roomName: room.name,
                    roomType: room.type,
                    pricePerNight: room.pricePerNight,
                  }))
                }
                className={cn(
                  "text-left border p-4 cursor-pointer transition-all duration-200 w-full",
                  isSelected
                    ? "border-emerald-dark bg-emerald-dark/5"
                    : "border-gray-200 hover:border-emerald"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-lg text-emerald-dark font-light mb-1">
                      {room.name}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                      {room.bedType && (
                        <span className="flex items-center gap-1">
                          <BedDouble size={12} className="text-gold" />
                          {room.bedType}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users size={12} className="text-gold" />
                        Up to {room.maxGuests} guests
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {room.shortDescription}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-serif text-xl text-emerald font-medium">
                      {formatNGN(room.pricePerNight)}
                    </p>
                    <p className="text-gray-400 text-xs">/night</p>
                    <div
                      className={cn(
                        "mt-2 w-5 h-5 rounded-full border-2 ml-auto flex items-center justify-center transition-all duration-200",
                        isSelected
                          ? "border-emerald-dark bg-emerald-dark"
                          : "border-gray-300"
                      )}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex justify-end">
          <Button
            variant="emerald"
            disabled={!formData.roomId}
            onClick={() => setStep(2)}
            type="button"
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // ─── Step 2: Dates & Guests ───────────────────────────────────────────────

  function Step2() {
    return (
      <div>
        <h2 className="font-serif text-2xl text-emerald-dark mb-6 font-light">
          Choose Your Dates
        </h2>

        <div className="mb-6">
          <DateRangePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={(date) => {
              setCheckIn(date)
              if (checkOut && date && checkOut <= date) {
                setCheckOut(null)
              }
            }}
            onCheckOutChange={setCheckOut}
          />
        </div>

        {/* Guests selector */}
        <div className="mb-6">
          <label className="text-gold text-xs tracking-widest uppercase block mb-2">
            Guests
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  guests: Math.max(1, (prev.guests ?? 1) - 1),
                }))
              }
              disabled={(formData.guests ?? 1) <= 1}
              className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-dark hover:text-emerald-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>
            <span className="font-serif text-2xl text-emerald-dark w-8 text-center">
              {formData.guests ?? 1}
            </span>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  guests: Math.min(
                    selectedRoom?.maxGuests ?? 4,
                    (prev.guests ?? 1) + 1
                  ),
                }))
              }
              disabled={
                (formData.guests ?? 1) >= (selectedRoom?.maxGuests ?? 4)
              }
              className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-dark hover:text-emerald-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
            {selectedRoom && (
              <span className="text-gray-400 text-xs ml-2">
                Max {selectedRoom.maxGuests} guests
              </span>
            )}
          </div>
        </div>

        {/* Nights summary */}
        {checkIn && checkOut && nights > 0 && (
          <div className="bg-ivory border border-gray-100 p-4 mb-6">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>
                {formatNGN(formData.pricePerNight ?? 0)} × {nights} night
                {nights > 1 ? "s" : ""}
              </span>
              <span className="font-semibold text-emerald-dark">
                {formatNGN(totalPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>
                {formatShortDate(checkIn)} → {formatShortDate(checkOut)}
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            type="button"
          >
            Back
          </Button>
          <Button
            variant="emerald"
            disabled={!checkIn || !checkOut || nights <= 0}
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                checkIn: checkIn!,
                checkOut: checkOut!,
              }))
              setStep(3)
            }}
            type="button"
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // ─── Step 3: Guest Details ────────────────────────────────────────────────

  function Step3() {
    const onSubmitStep3 = handleSubmit(
      (data) => {
        setFormData((prev) => ({
          ...prev,
          guestName: data.guestName,
          guestEmail: data.guestEmail,
          guestPhone: data.guestPhone,
          specialRequests: data.specialRequests,
        }))
        setStep(4)
      },
      () => {
        // validation errors handled by react-hook-form inline
      }
    )

    return (
      <form onSubmit={onSubmitStep3}>
        <h2 className="font-serif text-2xl text-emerald-dark mb-6 font-light">
          Your Details
        </h2>

        <div className="flex flex-col gap-5 mb-8">
          {/* Full Name */}
          <div>
            <label className="text-gray-500 text-sm mb-1 block">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("guestName")}
              type="text"
              placeholder="John Adeyemi"
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-dark text-gray-700 transition-colors"
            />
            {errors.guestName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.guestName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-500 text-sm mb-1 block">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              {...register("guestEmail")}
              type="email"
              placeholder="john@example.com"
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-dark text-gray-700 transition-colors"
            />
            {errors.guestEmail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.guestEmail.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-500 text-sm mb-1 block">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              {...register("guestPhone")}
              type="tel"
              placeholder="+234 800 000 0000"
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-dark text-gray-700 transition-colors"
            />
            {errors.guestPhone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.guestPhone.message}
              </p>
            )}
          </div>

          {/* Special Requests */}
          <div>
            <label className="text-gray-500 text-sm mb-1 block">
              Special Requests{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              {...register("specialRequests")}
              rows={3}
              placeholder="e.g. late check-in, anniversary setup, dietary requirements…"
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-emerald-dark text-gray-700 transition-colors resize-none"
            />
            {errors.specialRequests && (
              <p className="text-red-500 text-xs mt-1">
                {errors.specialRequests.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(2)}
            type="button"
          >
            Back
          </Button>
          <Button variant="emerald" type="submit">
            Continue
          </Button>
        </div>
      </form>
    )
  }

  // ─── Step 4: Review & Pay ─────────────────────────────────────────────────

  async function handlePayment() {
    setLoading(true)
    setError(null)
    try {
      const payload = {
        ...formData,
        checkIn: checkIn?.toISOString(),
        checkOut: checkOut?.toISOString(),
        roomType: selectedRoom?.type ?? "",
      }

      // 1. Create booking
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const booking = await bookingRes.json()
      if (!bookingRes.ok) throw new Error(booking.error || "Booking failed")

      // 2. Initialize payment
      const payRes = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.bookingId }),
      })
      const pay = await payRes.json()
      if (!payRes.ok) throw new Error(pay.error || "Payment init failed")

      // 3. Redirect to Paystack
      window.location.href = pay.authorization_url
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function Step4() {
    const detailValues = getValues()
    const guestName = formData.guestName || detailValues.guestName
    const guestEmail = formData.guestEmail || detailValues.guestEmail
    const guestPhone = formData.guestPhone || detailValues.guestPhone

    return (
      <div>
        <h2 className="font-serif text-2xl text-emerald-dark mb-6 font-light">
          Review &amp; Pay
        </h2>

        {/* Summary card */}
        <div className="bg-ivory p-6 mb-6 border border-gray-100">
          <h3 className="font-serif text-lg text-emerald-dark mb-4 font-light border-b border-gray-200 pb-3">
            Booking Summary
          </h3>

          <div className="flex flex-col gap-3 mb-5">
            <SummaryRow label="Room" value={formData.roomName ?? "—"} />
            <SummaryRow
              label="Check-in"
              value={checkIn ? formatShortDate(checkIn) : "—"}
            />
            <SummaryRow
              label="Check-out"
              value={checkOut ? formatShortDate(checkOut) : "—"}
            />
            <SummaryRow
              label="Guests"
              value={`${formData.guests ?? 1} guest${(formData.guests ?? 1) > 1 ? "s" : ""}`}
            />
          </div>

          {/* Price breakdown */}
          <div className="border-t border-gray-200 pt-4 mb-5">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>
                {formatNGN(formData.pricePerNight ?? 0)} × {nights} night
                {nights > 1 ? "s" : ""}
              </span>
              <span>{formatNGN(totalPrice)}</span>
            </div>
            <div className="flex justify-between items-center text-base font-semibold text-emerald-dark">
              <span>Total</span>
              <span className="font-serif text-xl">
                {formatNGN(totalPrice)}
              </span>
            </div>
          </div>

          {/* Guest info */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
              Guest Information
            </p>
            <div className="flex flex-col gap-2">
              <SummaryRow label="Name" value={guestName ?? "—"} />
              <SummaryRow label="Email" value={guestEmail ?? "—"} />
              <SummaryRow label="Phone" value={guestPhone ?? "—"} />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Pay button */}
        <button
          type="button"
          onClick={handlePayment}
          disabled={loading}
          className="bg-gold text-emerald-dark font-semibold px-8 py-4 w-full uppercase tracking-widest text-sm hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Processing…
            </>
          ) : (
            "Pay with Paystack"
          )}
        </button>

        {/* Trust badges */}
        <p className="text-center text-gray-400 text-xs mt-3 tracking-wide">
          Secured by Paystack &middot; Visa &middot; Mastercard &middot; Verve
          &middot; Bank Transfer
        </p>

        <div className="flex justify-start mt-4">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="text-xs text-gray-400 underline underline-offset-2 hover:text-emerald-dark transition-colors"
          >
            Back to details
          </button>
        </div>
      </div>
    )
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl p-8 md:p-12">
      <StepIndicator />

      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
    </div>
  )
}

// ─── Small helper ─────────────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline gap-4">
      <span className="text-gray-400 text-sm flex-shrink-0">{label}</span>
      <span className="text-gray-700 text-sm text-right">{value}</span>
    </div>
  )
}
