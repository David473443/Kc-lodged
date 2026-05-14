import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendContactAutoReply } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        subject: data.subject,
        message: data.message,
        responded: false,
      },
    });

    // Send emails (best-effort — don't fail the response if email errors)
    try {
      await sendContactAutoReply({
        name: data.name,
        email: data.email,
        subject: data.subject,
      });
    } catch (emailError) {
      console.error("[contact] Email send failed:", emailError);
    }

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("[POST /api/contact]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
