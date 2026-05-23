import { Hono } from "hono";
import { prisma } from "../../../src/core/config/prisma"; // adjust if needed

const feed = new Hono();

// GET /lafflab/feed
feed.get("/feed", async c => {
  const userId = c.get("userId") as string | undefined;
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const url = new URL(c.req.url);
  const limit = Number(url.searchParams.get("limit") ?? "20");
  const cursor = url.searchParams.get("cursor");

  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followingIds = following.map(f => f.followingId);
  if (followingIds.length === 0) {
    return c.json({ posts: [], nextCursor: null });
  }

  const posts = await prisma.post.findMany({
    where: { authorId: { in: followingIds } },
    include: {
      author: true,
      reactions: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

  let nextCursor: string | null = null;
  if (posts.length > limit) {
    nextCursor = posts[limit].id;
    posts.pop();
  }

  const formatted = posts.map(post => {
    const counts = {
      laugh: 0,
      smile: 0,
      expressionless: 0,
      shock: 0,
      mindblown: 0,
      angry: 0,
      crickets: 0,
    };

    let viewerReaction: string | null = null;

    post.reactions.forEach(r => {
      const key = r.type.toLowerCase() as keyof typeof counts;
      if (counts[key] !== undefined) counts[key] += 1;
      if (r.userId === userId) viewerReaction = key;
    });

    return {
      id: post.id,
      authorId: post.authorId,
      author: {
        id: post.author.id,
        username: post.author.username,
        displayName: post.author.name,
        avatarUrl: post.author.avatarUrl,
      },
      text: post.text,
      type: post.type.toLowerCase(),
      mediaUrl: post.mediaUrl,
      mediaDurationSeconds: post.mediaDurationSeconds,
      createdAt: post.createdAt,
      reactions: counts,
      viewerReaction,
    };
  });

  return c.json({ posts: formatted, nextCursor });
});

export default feed;
