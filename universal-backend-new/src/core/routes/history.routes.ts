import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const history = new Hono();

// TEMP: demo user
const DEMO_SCREENNAME = "demo";

function attachAuthorIdentity(item: any) {
  if (item?.post?.author) {
    const author = item.post.author;
    item.post.author = {
      id: author.id,
      screenName: author.screenName,
      displayName: author.screenName,
      avatarUrl: author.avatarUrl,
    };
  }
  return item;
}

// GET /core/history
history.get("/", async (c) => {
  const user = await prisma.user.findUnique({
    where: { screenName: DEMO_SCREENNAME },
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
              screenName: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
    orderBy: { viewedAt: "desc" },
  });

  const items = itemsRaw.map(attachAuthorIdentity);

  return c.json({ items });
});

export default history;
