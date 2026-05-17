import { Router } from "express";
import crypto from "crypto";
import prisma from "../../lib/prisma";
import sendEmail from "../../services/sendEmail";

const router = Router();

router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return ok to avoid user enumeration
    if (!user) {
      return res.json({ ok: true });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

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

    return res.json({ ok: true });
  } catch (err) {
    console.error("Reset-password error:", err);
    return res.status(500).json({ error: "Failed to send reset email" });
  }
});

export default router;
