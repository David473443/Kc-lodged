"use client"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Calendar } from "lucide-react"
import { addDays } from "@/lib/utils"

interface DateRangePickerProps {
  checkIn: Date | null
  checkOut: Date | null
  onCheckInChange: (date: Date | null) => void
  onCheckOutChange: (date: Date | null) => void
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: DateRangePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Check-in */}
      <div className="flex flex-col gap-1">
        <label className="text-gold text-xs tracking-widest uppercase">
          Check-in
        </label>
        <div className="relative">
          <DatePicker
            selected={checkIn}
            onChange={onCheckInChange}
            minDate={new Date()}
            dateFormat="dd MMM yyyy"
            placeholderText="Select date"
            className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold text-gray-700"
            wrapperClassName="w-full"
          />
          <Calendar
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Check-out */}
      <div className="flex flex-col gap-1">
        <label className="text-gold text-xs tracking-widest uppercase">
          Check-out
        </label>
        <div className="relative">
          <DatePicker
            selected={checkOut}
            onChange={onCheckOutChange}
            minDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1)}
            dateFormat="dd MMM yyyy"
            placeholderText="Select date"
            className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold text-gray-700"
            wrapperClassName="w-full"
          />
          <Calendar
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
            size={16}
          />
        </div>
      </div>
    </div>
  )
}
