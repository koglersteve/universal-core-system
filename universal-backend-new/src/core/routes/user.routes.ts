import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";
import { normalizeScreenName } from "@/core/utils/identity.js";
import { hashPassword } from "@/core/utils/auth.utils.js";

const userRoutes = new Hono();

// POST /core/user
userRoutes.post("/", async (c) => {
  const { email, screenName, password } = await c.req.json();

  if (!email || !screenName || !password) {
    return c.json({ error: "email, screenName, and password are required" }, 400);
  }

  const shaped = normalizeScreenName(screenName);
  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      screenName: shaped,
      password: hashed,
    },
  });

  return c.json(user);
});

// PATCH /core/user/:id
userRoutes.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const { screenName } = await c.req.json();

  if (!screenName) {
    return c.json({ error: "screenName is required" }, 400);
  }

  const shaped = normalizeScreenName(screenName);

  const user = await prisma.user.update({
    where: { id },
    data: { screenName: shaped },
  });

  return c.json(user);
});

export default userRoutes;
