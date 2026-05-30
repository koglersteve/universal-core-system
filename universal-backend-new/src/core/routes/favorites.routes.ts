// src/core/routes/favorites.routes.ts
import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const favorites = new Hono();

// TEMP: demo user
const DEMO_USERNAME = "demo";

function attachAuthorDisplayNameToFavorite(fav: any) {
  if (fav?.post?.author) {
    const author: any = fav.post.author;
    fav.post.author = {
      ...author,
      displayName: author.displayName ?? author.username,
    };
  }
  return fav;
}

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
              avatarUrl: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const items = favs.map(attachAuthorDisplayNameToFavorite);

  return c.json({ items });
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
              avatarUrl: true,
            },
          },
        },
      },
    },
  });

  if (!fav) return c.json({ error: "Favorite not found" }, 404);

  const item = attachAuthorDisplayNameToFavorite(fav);

  return c.json(item);
});

export default favorites;
