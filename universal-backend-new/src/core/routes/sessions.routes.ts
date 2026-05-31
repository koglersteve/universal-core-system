import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const sessions = new Hono();

// GET /core/sessions/me
sessions.get("/me", async (c) => {
  const token = c.req.header("authorization");

  if (!token) return c.json({ user: null });

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return c.json({ user: null });
  if (session.expiresAt < new Date()) return c.json({ user: null });

  return c.json({
    user: {
      id: session.user.id,
      screenName: session.user.screenName,
      email: session.user.email,
      avatarUrl: session.user.avatarUrl,
    },
  });
});

// DELETE /core/sessions/logout
sessions.delete("/logout", async (c) => {
  const token = c.req.header("authorization");
  if (!token) return c.json({ ok: true });

  await prisma.session.deleteMany({ where: { token } });

  return c.json({ ok: true });
});

export default sessions;
