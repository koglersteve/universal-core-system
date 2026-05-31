import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const favorites = new Hono();

// TEMP: demo user
const DEMO_SCREENNAME = "demo";

function attachAuthorIdentity(fav: any) {
  if (fav?.post?.author) {
    const author = fav.post.author;
    fav.post.author = {
      id: author.id,
      screenName: author.screenName,
      displayName: author.screenName,
      avatarUrl: author.avatarUrl,
    };
  }
  return fav;
}

// GET /core/favorites
favorites.get("/", async (c) => {
  const user = await prisma.user.findUnique({
    where: { screenName: DEMO_SCREENNAME },
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
              screenName: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const items = favs.map(attachAuthorIdentity);

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
              screenName: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });

  if (!fav) return c.json({ error: "Favorite not found" }, 404);

  const item = attachAuthorIdentity(fav);

  return c.json(item);
});

export default favorites;
