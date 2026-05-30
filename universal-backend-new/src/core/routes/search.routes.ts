// src/core/routes/search.routes.ts
import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const search = new Hono();

function attachAuthorDisplayNameToPost(post: any) {
  if (post?.author) {
    const author: any = post.author;
    post.author = {
      ...author,
      displayName: author.displayName ?? author.username,
    };
  }
  return post;
}

// GET /core/search?q=...
search.get("/", async (c) => {
  const q = c.req.query("q");

  if (!q || q.trim() === "") return c.json({ items: [] });

  const itemsRaw = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
        { tags: { has: q } },
      ],
    },
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

  const items = itemsRaw.map(attachAuthorDisplayNameToPost);

  return c.json({ items });
});

export default search;
