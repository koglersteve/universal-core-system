import { Hono } from "hono";
import crypto from "crypto";
import prisma from "../../../shared/api/prisma";
import sendEmail from "../../services/sendEmail";

const router = new Hono();

router.post("/reset-password", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json({ ok: true });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 15);

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset your LAFFLab password",
      html: `
        <h2>Reset your LAFFLab password</h2>
        <p>Click the link below to choose a new password:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you didn’t request this, you can ignore this email.</p>
      `,
    });

    return c.json({ ok: true });
  } catch (err) {
    console.error("Reset-password error:", err);
    return c.json({ error: "Failed to send reset email" }, 500);
  }
});

export default router;
