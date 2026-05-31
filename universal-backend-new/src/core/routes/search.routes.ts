import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const search = new Hono();

function attachAuthorIdentity(post: any) {
  if (post?.author) {
    const author = post.author;
    post.author = {
      id: author.id,
      screenName: author.screenName,
      displayName: author.screenName,
      avatarUrl: author.avatarUrl,
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
          screenName: true,
          avatarUrl: true,
        },
      },
    },
  });

  const items = itemsRaw.map(attachAuthorIdentity);

  return c.json({ items });
});

export default search;
