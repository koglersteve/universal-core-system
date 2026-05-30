// src/core/routes/feed.routes.ts
import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const feed = new Hono();

// Helper to attach displayName to author
function attachAuthorDisplayName<T extends { author: { username: string } }>(
  item: T
): T & { author: T["author"] & { displayName: string } } {
  const anyAuthor = item.author as any;
  return {
    ...item,
    author: {
      ...item.author,
      displayName: anyAuthor.displayName ?? item.author.username,
    },
  };
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
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  const items = posts.map(attachAuthorDisplayName);

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
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!post) return c.json({ error: "Post not found" }, 404);

  const item = attachAuthorDisplayName(post);

  return c.json(item);
});

export default feed;
