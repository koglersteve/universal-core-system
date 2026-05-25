import { Hono } from "hono";
import prisma from "@/shared/prisma.js";
import { ReactionService } from "@/core/reactions/reaction-service.js";

const router = new Hono();

// For now, hard-coded app id for LAFFlab
const LAFFLAB_APP_ID = "lafflab";
const LAFFLAB_POST_KIND = "post";

/**
 * Root
 */
router.get("/", (c) => {
  return c.json({
    message: "Lafflab API online",
    app: LAFFLAB_APP_ID,
    updatedAt: Date.now(),
  });
});

/**
 * FEED — GET /core/lafflab/feed
 * Returns latest LAFFlab posts
 */
router.get("/feed", async (c) => {
  const posts = await prisma.post.findMany({
    where: {
      app: LAFFLAB_APP_ID,
      kind: LAFFLAB_POST_KIND,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return c.json({ posts });
});

/**
 * LOAD MORE FEED — GET /core/lafflab/feed/more
 * (Simple version: same as /feed for now)
 */
router.get("/feed/more", async (c) => {
  const posts = await prisma.post.findMany({
    where: {
      app: LAFFLAB_APP_ID,
      kind: LAFFLAB_POST_KIND,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return c.json({ posts });
});

/**
 * FAVORITES — GET /core/lafflab/favorites
 * NOTE: In a real system, userId should come from auth/session.
 */
router.get("/favorites", async (c) => {
  const userId = c.req.query("userId");
  if (!userId) {
    return c.json({ favorites: [] });
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
      app: LAFFLAB_APP_ID,
      targetType: LAFFLAB_POST_KIND,
    },
    include: {
      post: true,
    },
  });

  return c.json({ favorites });
});

/**
 * FAVORITES TOGGLE — POST /core/lafflab/favorites/:id/toggle
 * :id is the Post.id
 */
router.post("/favorites/:id/toggle", async (c) => {
  const postId = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));
  const userId = body.userId as string | undefined;

  if (!userId) {
    return c.json({ ok: false, error: "userId required" }, 400);
  }

  const existing = await prisma.favorite.findFirst({
    where: {
      userId,
      app: LAFFLAB_APP_ID,
      targetType: LAFFLAB_POST_KIND,
      targetId: postId,
    },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return c.json({ ok: true, removed: true });
  }

  await prisma.favorite.create({
    data: {
      userId,
      app: LAFFLAB_APP_ID,
      targetType: LAFFLAB_POST_KIND,
      targetId: postId,
    },
  });

  return c.json({ ok: true, added: true });
});

/**
 * CREATE POST — POST /core/lafflab/posts
 */
router.post("/posts", async (c) => {
  const body = await c.req.json();

  const post = await prisma.post.create({
    data: {
      creatorId: body.creatorId,
      app: LAFFLAB_APP_ID,
      kind: LAFFLAB_POST_KIND,
      text: body.text ?? null,
      mediaUrl: body.mediaUrl ?? null,
      score: 0,
      metadata: body.metadata ?? undefined,
    },
  });

  return c.json({ ok: true, post });
});

/**
 * SINGLE POST — GET /core/lafflab/posts/:id
 */
router.get("/posts/:id", async (c) => {
  const id = c.req.param("id");

  const post = await prisma.post.findFirst({
    where: {
      id,
      app: LAFFLAB_APP_ID,
      kind: LAFFLAB_POST_KIND,
    },
  });

  return c.json({ post });
});

/**
 * REACT TO POST — POST /core/lafflab/posts/:id/react
 */
router.post("/posts/:id/react", async (c) => {
  const postId = c.req.param("id");
  const body = await c.req.json();
  const userId = body.userId as string | undefined;
  const emoji = body.emoji as string | undefined;

  if (!userId || !emoji) {
    return c.json({ ok: false, error: "userId and emoji required" }, 400);
  }

  await ReactionService.addReaction({
    userId,
    postId,
    app: LAFFLAB_APP_ID,
    emoji,
  });

  return c.json({ ok: true });
});

/**
 * HISTORY — GET /core/lafflab/history
 * Returns history entries for LAFFlab posts
 */
router.get("/history", async (c) => {
  const userId = c.req.query("userId");
  if (!userId) {
    return c.json({ history: [] });
  }

  const history = await prisma.history.findMany({
    where: {
      userId,
      app: LAFFLAB_APP_ID,
      targetType: LAFFLAB_POST_KIND,
    },
    orderBy: { viewedAt: "desc" },
    include: {
      post: true,
    },
  });

  return c.json({ history });
});

/**
 * SETTINGS — GET /core/lafflab/settings
 * For now, this is a simple stub that could be backed by UserSettings or another generic store.
 */
router.get("/settings", async (c) => {
  // In a real system, you'd likely scope this by userId + app.
  // For now, return static defaults for LAFFlab.
  return c.json({
    settings: {
      app: LAFFLAB_APP_ID,
      autoplay: false,
      showAds: true,
      theme: "dark",
    },
  });
});

export default router;
