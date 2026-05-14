import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";
import { sendNewsletterWelcome } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    await prisma.newsletter.upsert({
      where: { email },
      update: { active: true },
      create: { email, active: true },
    });

    // Send welcome email (best-effort — don't fail the response if email errors)
    try {
      await sendNewsletterWelcome(email);
    } catch (emailError) {
      console.error("[newsletter] Welcome email failed:", emailError);
    }

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("[POST /api/newsletter]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
