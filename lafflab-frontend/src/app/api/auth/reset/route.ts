import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "../../lib/db";

const router = Router();

router.post("/reset", async (req, res) => {
  const { token, password } = req.body;

  const record = await db.password_reset_tokens.findUnique({
    where: { token },
  });

  if (!record) return res.status(400).json({ error: "Invalid token" });
  if (record.used) return res.status(400).json({ error: "Token already used" });
  if (record.expires_at < new Date())
    return res.status(400).json({ error: "Token expired" });

  const hashed = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: record.user_id },
    data: { password: hashed },
  });

  await db.password_reset_tokens.update({
    where: { token },
    data: { used: true },
  });

  return res.json({ ok: true });
});

export default router;
