// src/core/routes/history.routes.ts
import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const history = new Hono();

// TEMP: demo user
const DEMO_USERNAME = "demo";

// Helper to attach displayName
function attachAuthorDisplayNameToHistoryItem(item: any) {
  if (item?.post?.author) {
    const author: any = item.post.author;
    item.post.author = {
      ...author,
      displayName: author.displayName ?? author.username,
    };
  }
  return item;
}

// GET /core/history
history.get("/", async (c) => {
  const user = await prisma.user.findUnique({
    where: { username: DEMO_USERNAME },
  });

  if (!user) return c.json({ items: [] });

  const itemsRaw = await prisma.history.findMany({
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
    orderBy: { viewedAt: "desc" },
  });

  const items = itemsRaw.map(attachAuthorDisplayNameToHistoryItem);

  return c.json({ items });
});

export default history;
