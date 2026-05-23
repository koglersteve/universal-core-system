import { Hono } from "hono";
import { prisma } from "../../../src/core/config/prisma";

const feed = new Hono();

// GET /lafflab/feed?page=1
feed.get("/feed", async c => {
  const userId = c.get("userId") as string | undefined;
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const url = new URL(c.req.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const PAGE_SIZE = 20;

  const skip = (page - 1) * PAGE_SIZE;

  // Get following list
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followingIds = following.map(f => f.followingId);

  // Include self in feed
  const visibleAuthorIds = [...followingIds, userId];

  const posts = await prisma.post.findMany({
    where: { authorId: { in: visibleAuthorIds } },
    include: {
      author: true,
      reactions: true,
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: PAGE_SIZE,
  });

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

  const hasMore = posts.length === PAGE_SIZE;

  return c.json({
    posts: formatted,
    hasMore,
    nextPage: hasMore ? page + 1 : null,
  });
});

export default feed;
