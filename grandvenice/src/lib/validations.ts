import { z } from "zod";

export const bookingSchema = z.object({
  roomId: z.string().min(1, "Room is required"),
  roomName: z.string().min(1),
  roomType: z.string().min(1),
  pricePerNight: z.number().positive(),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.number().int().min(1).max(4),
  guestName: z.string().min(2, "Name must be at least 2 characters").max(100),
  guestEmail: z.string().email("Enter a valid email address"),
  guestPhone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20, "Phone number too long"),
  specialRequests: z.string().max(500).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject too short").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
