import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const search = new Hono();

// GET /core/search?q=...
search.get("/", async (c) => {
  const q = c.req.query("q");

  if (!q || q.trim() === "") return c.json({ items: [] });

  const items = await prisma.post.findMany({
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

  return c.json({ items });
});

export default search;
