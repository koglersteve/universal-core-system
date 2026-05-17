import { Hono } from "hono";
import bcrypt from "bcryptjs";
import prisma from "../../../shared/api/prisma";

const router = new Hono();

router.post("/reset", async (c) => {
  try {
    const body = await c.req.json();
    const { token, password } = body;

    if (!token || !password) {
      return c.json({ error: "Token and password are required" }, 400);
    }

    const record = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!record) {
      return c.json({ error: "Invalid token" }, 400);
    }

    if (record.expires < new Date()) {
      return c.json({ error: "Token expired" }, 400);
    }

    const hashed = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: record.userId },
      data: { password: hashed },
    });

    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return c.json({ ok: true });
  } catch (err) {
    console.error("Reset error:", err);
    return c.json({ error: "Password reset failed" }, 500);
  }
});

export default router;
