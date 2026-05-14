import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";
import { generatePaystackReference, calculateNights } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check for overlapping CONFIRMED bookings
    const overlap = await prisma.booking.findFirst({
      where: {
        roomId: data.roomId,
        status: "CONFIRMED",
        OR: [
          {
            checkIn: {
              lt: new Date(data.checkOut),
              gte: new Date(data.checkIn),
            },
          },
          {
            checkOut: {
              gt: new Date(data.checkIn),
              lte: new Date(data.checkOut),
            },
          },
        ],
      },
    });

    if (overlap) {
      return Response.json(
        { error: "Room not available for selected dates" },
        { status: 409 }
      );
    }

    const nights = calculateNights(
      new Date(data.checkIn),
      new Date(data.checkOut)
    );
    const totalAmountNGN = nights * data.pricePerNight;
    const reference = generatePaystackReference();

    const booking = await prisma.booking.create({
      data: {
        reference,
        roomId: data.roomId,
        roomName: data.roomName,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        nights,
        guests: data.guests,
        totalAmountNGN,
        specialRequests: data.specialRequests,
        status: "PENDING",
        paymentStatus: "UNPAID",
      },
    });

    return Response.json(
      {
        bookingId: booking.id,
        reference: booking.reference,
        totalAmountNGN,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("[POST /api/bookings]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
