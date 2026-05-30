import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const feed = new Hono();

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
          username: true,
          displayName: true,   // ⭐ REQUIRED
          avatarUrl: true,
        },
      },
    },
  });

  const nextCursor =
    posts.length === limit ? posts[posts.length - 1].id : null;

  return c.json({ items: posts, nextCursor });
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
          username: true,
          displayName: true,   // ⭐ REQUIRED
          avatarUrl: true,
        },
      },
    },
  });

  if (!post) return c.json({ error: "Post not found" }, 404);

  return c.json(post);
});

export default feed;
