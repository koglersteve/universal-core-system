import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await db.user.findUnique({ where: { email } });

  // Always return ok to avoid user enumeration
  if (!user) return NextResponse.json({ ok: true });

  const token = crypto.randomBytes(32).toString("hex");

  await db.password_reset_tokens.create({
    data: {
      user_id: user.id,
      token,
      expires_at: new Date(Date.now() + 1000 * 60 * 30),
      used: false,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your LAFFLab password",
    html: `
      <h2 style="font-family: sans-serif; color: #111;">
        Reset your LAFFLab password
      </h2>

      <p style="font-family: sans-serif; color: #444;">
        Someone requested a password reset for your LAFFLab account.
        If it was you, click the link below and choose a new password.
      </p>

      <p>
        <a href="${resetUrl}"
          style="background: #ec4899; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-family: sans-serif;">
          Reset Password
        </a>
      </p>

      <p style="font-family: sans-serif; color: #666; margin-top: 20px;">
        If you didn’t request this, you can safely ignore it.
      </p>
    `,
  });

  return NextResponse.json({ ok: true });
}
