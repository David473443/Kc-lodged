import { prisma } from "@/lib/prisma";
import { initializePayment } from "@/lib/paystack";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId) {
      return Response.json({ error: "bookingId is required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status !== "PENDING" || booking.paymentStatus !== "UNPAID") {
      return Response.json(
        { error: "Booking is not eligible for payment" },
        { status: 400 }
      );
    }

    const result = await initializePayment({
      email: booking.guestEmail,
      amount: booking.totalAmountNGN * 100, // kobo
      reference: booking.reference,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking/confirmation`,
      metadata: {
        bookingId: booking.id,
        guestName: booking.guestName,
        roomName: booking.roomName,
      },
    });

    return Response.json({ authorization_url: result.authorization_url });
  } catch (error) {
    console.error("[POST /api/payment/initialize]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
