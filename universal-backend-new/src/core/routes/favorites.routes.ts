import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const favorites = new Hono();

// TEMP: demo user
const DEMO_USERNAME = "demo";

// GET /core/favorites
favorites.get("/", async (c) => {
  const user = await prisma.user.findUnique({
    where: { username: DEMO_USERNAME },
  });

  if (!user) return c.json({ items: [] });

  const favs = await prisma.favorite.findMany({
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
    orderBy: { createdAt: "desc" },
  });

  return c.json({ items: favs });
});

// GET /core/favorites/:id
favorites.get("/:id", async (c) => {
  const id = c.req.param("id");

  const fav = await prisma.favorite.findUnique({
    where: { id },
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
  });

  if (!fav) return c.json({ error: "Favorite not found" }, 404);

  return c.json(fav);
});

export default favorites;
