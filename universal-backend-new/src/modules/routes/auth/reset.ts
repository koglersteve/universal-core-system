import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";

const router = Router();

router.post("/reset", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }

    const record = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!record) {
      return res.status(400).json({ error: "Invalid token" });
    }

    if (record.expires < new Date()) {
      return res.status(400).json({ error: "Token expired" });
    }

    const hashed = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: record.userId },
      data: { password: hashed },
    });

    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Reset error:", err);
    return res.status(500).json({ error: "Password reset failed" });
  }
});

export default router;
