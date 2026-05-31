import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const feed = new Hono();

function attachAuthorIdentity(item: any) {
  if (item?.author) {
    const author = item.author;
    item.author = {
      id: author.id,
      screenName: author.screenName,
      displayName: author.screenName,
      avatarUrl: author.avatarUrl,
    };
  }
  return item;
}

// GET /core/feed
feed.get("/", async (c) => {
  const cursor = c.req.query("cursor");
  const limit = Number(c.req.query("limit") ?? 10);

  let cursorObj = undefined;
  if (cursor) {
    const exists = await prisma.post.findUnique({ where: { id: cursor } });
    if (exists) cursorObj = { id: cursor };
  }

  const posts = await prisma.post.findMany({
    take: limit,
    skip: cursorObj ? 1 : 0,
    cursor: cursorObj,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          screenName: true,
          avatarUrl: true,
        },
      },
    },
  });

  const items = posts.map(attachAuthorIdentity);

  const nextCursor =
    posts.length === limit ? posts[posts.length - 1].id : null;

  return c.json({ items, nextCursor });
});

// GET /core/feed/:id
feed.get("/:id", async (c) => {
  const id = c.req.param("id");

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          screenName: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!post) return c.json({ error: "Post not found" }, 404);

  const item = attachAuthorIdentity(post);

  return c.json(item);
});

export default feed;
