import { Hono } from "hono";
import prisma from "../../shared/prisma";

const router = new Hono();

router.get("/", async (c) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { creator: true }
  });
  return c.json(posts);
});

router.post("/", async (c) => {
  const body = await c.req.json();
  const { creatorId, type, text, mediaUrl, app } = body;

  const post = await prisma.post.create({
    data: { creatorId, type, text, mediaUrl, app }
  });

  return c.json(post);
});

router.get("/:id", async (c) => {
  const id = c.req.param("id");

  const post = await prisma.post.findUnique({
    where: { id },
    include: { creator: true }
  });

  if (!post) return c.json({ error: "Post not found" }, 404);
  return c.json(post);
});

export default router;
