import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const history = new Hono();

// TEMP: demo user
const DEMO_USERNAME = "demo";

// GET /core/history
history.get("/", async (c) => {
  const user = await prisma.user.findUnique({
    where: { username: DEMO_USERNAME },
  });

  if (!user) return c.json({ items: [] });

  const items = await prisma.history.findMany({
    where: { userId: user.id },
    include: {
      post: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              displayName: true,   // ⭐ REQUIRED
              avatarUrl: true,
            },
          },
        },
      },
    },
    orderBy: { viewedAt: "desc" },
  });

  return c.json({ items });
});

export default history;
