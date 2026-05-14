import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(booking);
  } catch (error) {
    console.error("[GET /api/bookings/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
