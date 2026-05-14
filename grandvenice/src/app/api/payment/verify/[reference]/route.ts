import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/paystack";
import {
  sendBookingConfirmation,
  sendBookingNotificationToHotel,
} from "@/lib/resend";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    const paymentData = await verifyPayment(reference);

    const booking = await prisma.booking.findUnique({ where: { reference } });

    if (!booking) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    if (paymentData.status === "success") {
      const updatedBooking = await prisma.booking.update({
        where: { reference },
        data: {
          status: "CONFIRMED",
          paymentStatus: "PAID",
          paystackData: paymentData as object,
        },
      });

      // Send confirmation emails (best-effort — don't fail the response if email errors)
      try {
        await Promise.all([
          sendBookingConfirmation({
            guestName: updatedBooking.guestName,
            guestEmail: updatedBooking.guestEmail,
            roomName: updatedBooking.roomName,
            checkIn: updatedBooking.checkIn.toISOString(),
            checkOut: updatedBooking.checkOut.toISOString(),
            nights: updatedBooking.nights,
            guests: updatedBooking.guests,
            totalAmountNGN: updatedBooking.totalAmountNGN,
            reference: updatedBooking.reference,
          }),
          sendBookingNotificationToHotel({
            guestName: updatedBooking.guestName,
            guestEmail: updatedBooking.guestEmail,
            roomName: updatedBooking.roomName,
            checkIn: updatedBooking.checkIn.toISOString(),
            checkOut: updatedBooking.checkOut.toISOString(),
            nights: updatedBooking.nights,
            guests: updatedBooking.guests,
            totalAmountNGN: updatedBooking.totalAmountNGN,
            reference: updatedBooking.reference,
          }),
        ]);
      } catch (emailError) {
        console.error("[verify] Email send failed:", emailError);
      }

      return Response.json({
        booking: updatedBooking,
        paymentStatus: paymentData.status,
      });
    } else {
      const updatedBooking = await prisma.booking.update({
        where: { reference },
        data: {
          paymentStatus: "FAILED",
          paystackData: paymentData as object,
        },
      });

      return Response.json({
        booking: updatedBooking,
        paymentStatus: paymentData.status,
      });
    }
  } catch (error) {
    console.error("[GET /api/payment/verify/[reference]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
