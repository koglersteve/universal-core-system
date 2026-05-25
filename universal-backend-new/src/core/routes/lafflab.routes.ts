import { Hono } from "hono";
import prisma from "@/shared/prisma.js";

const router = new Hono();

/**
 * Root
 */
router.get("/", (c) => {
  return c.json({
    message: "Lafflab API online",
    updatedAt: Date.now(),
  });
});

/**
 * FEED — GET /core/lafflab/feed
 */
router.get("/feed", async (c) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { username: true } },
      reactions: true,
    },
    take: 20,
  });

  return c.json({ posts });
});

/**
 * LOAD MORE FEED — GET /core/lafflab/feed/more
 * (Optional: same as feed for now)
 */
router.get("/feed/more", async (c) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { username: true } },
      reactions: true,
    },
    take: 20,
  });

  return c.json({ posts });
});

/**
 * FAVORITES — GET /core/lafflab/favorites
 */
router.get("/favorites", async (c) => {
  const favorites = await prisma.favorite.findMany({
    include: {
      post: {
        include: {
          author: { select: { username: true } },
          reactions: true,
        },
      },
    },
  });

  return c.json({ favorites });
});

/**
 * FAVORITES TOGGLE — POST /core/lafflab/favorites/:id/toggle
 */
router.post("/favorites/:id/toggle", async (c) => {
  const id = c.req.param("id");

  // Toggle logic
  const existing = await prisma.favorite.findFirst({ where: { postId: id } });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return c.json({ ok: true, removed: true });
  }

  await prisma.favorite.create({ data: { postId: id } });
  return c.json({ ok: true, added: true });
});

/**
 * POST CREATION — POST /core/lafflab/posts
 */
router.post("/posts", async (c) => {
  const body = await c.req.json();

  const post = await prisma.post.create({
    data: {
      content: body.content,
      authorId: body.authorId ?? null,
    },
  });

  return c.json({ ok: true, post });
});

/**
 * SINGLE POST — GET /core/lafflab/posts/:id
 */
router.get("/posts/:id", async (c) => {
  const id = c.req.param("id");

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { username: true } },
      reactions: true,
    },
  });

  return c.json({ post });
});

/**
 * REACTIONS — POST /core/lafflab/posts/:id/react
 */
router.post("/posts/:id/react", async (c) => {
  const id = c.req.param("id");
  const { key } = await c.req.json();

  await prisma.reaction.create({
    data: {
      postId: id,
      type: key,
    },
  });

  return c.json({ ok: true });
});

/**
 * HISTORY — GET /core/lafflab/history
 * (Stub for now — returns empty array)
 */
router.get("/history", async (c) => {
  return c.json({ history: [] });
});

/**
 * SETTINGS — GET /core/lafflab/settings
 * (Stub for now — returns defaults)
 */
router.get("/settings", async (c) => {
  return c.json({
    settings: {
      autoplay: false,
      showAds: true,
      theme: "dark",
    },
  });
});

/**
 * SETTINGS — POST /core/lafflab/settings
 */
router.post("/settings", async (c) => {
  const body = await c.req.json();

  // No DB table yet — return what was sent
  return c.json({
    ok: true,
    settings: body,
  });
});

export default router;
