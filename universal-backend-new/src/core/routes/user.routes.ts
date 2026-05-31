import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";
import { normalizeScreenName } from "@/core/utils/identity.js";

const userRoutes = new Hono();

// POST /core/user  (create user)
userRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const { email, screenName } = body;

  if (!email || !screenName) {
    return c.json({ error: "email and screenName are required" }, 400);
  }

  const shaped = normalizeScreenName(screenName);

  const user = await prisma.user.create({
    data: {
      email,
      screenName: shaped,
    },
  });

  return c.json(user);
});

// PATCH /core/user/:id  (update screenName)
userRoutes.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  if (!body.screenName) {
    return c.json({ error: "screenName is required" }, 400);
  }

  const shaped = normalizeScreenName(body.screenName);

  const user = await prisma.user.update({
    where: { id },
    data: { screenName: shaped },
  });

  return c.json(user);
});

export default userRoutes;
