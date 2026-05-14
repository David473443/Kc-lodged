import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (!roomId || !checkIn || !checkOut) {
      return Response.json({ error: "Missing params" }, { status: 400 });
    }

    const overlap = await prisma.booking.findFirst({
      where: {
        roomId,
        status: "CONFIRMED",
        OR: [
          {
            checkIn: {
              lt: new Date(checkOut),
              gte: new Date(checkIn),
            },
          },
          {
            checkOut: {
              gt: new Date(checkIn),
              lte: new Date(checkOut),
            },
          },
        ],
      },
    });

    return Response.json({ available: !overlap });
  } catch (error) {
    console.error("[GET /api/rooms/availability]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
