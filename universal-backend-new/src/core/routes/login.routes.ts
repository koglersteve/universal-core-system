import { Hono } from "hono";
import { prisma } from "../../shared/prisma/client.js";
import { verifyPassword, generateSessionToken } from "../utils/auth.utils.js";

const login = new Hono();

// POST /core/login
login.post("/", async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: "email and password required" }, 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return c.json({ error: "Invalid credentials" }, 401);

  const valid = await verifyPassword(password, user.password);
  if (!valid) return c.json({ error: "Invalid credentials" }, 401);

  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  return c.json({
    ok: true,
    token,
    user: {
      id: user.id,
      screenName: user.screenName,
      email: user.email,
      avatarUrl: user.avatarUrl,
    },
  });
});

export default login;
