import { Hono } from "hono";
import { prisma } from "../../../src/core/config/prisma"; // adjust if needed

const profile = new Hono();

// GET /lafflab/profile/:username
profile.get("/profile/:username", async c => {
  const viewerId = c.get("userId") as string | undefined;
  if (!viewerId) return c.json({ error: "Unauthorized" }, 401);

  const { username } = c.req.param();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return c.json({ error: "User not found" }, 404);

  const followerCount = await prisma.follow.count({
    where: { followingId: user.id },
  });

  const followingCount = await prisma.follow.count({
    where: { followerId: user.id },
  });

  const isFollowing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: viewerId,
        followingId: user.id,
      },
    },
  });

  return c.json({
    profile: {
      id: user.id,
      username: user.username,
      displayName: user.name,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      followerCount,
      followingCount,
      isFollowing: Boolean(isFollowing),
    },
  });
});

// GET /lafflab/profile/:username/posts
profile.get("/profile/:username/posts", async c => {
  const viewerId = c.get("userId") as string | undefined;
  if (!viewerId) return c.json({ error: "Unauthorized" }, 401);

  const { username } = c.req.param();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return c.json({ error: "User not found" }, 404);

  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
    include: { reactions: true },
    orderBy: { createdAt: "desc" },
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
      if (r.userId === viewerId) viewerReaction = key;
    });

    return {
      id: post.id,
      authorId: post.authorId,
      text: post.text,
      type: post.type.toLowerCase(),
      mediaUrl: post.mediaUrl,
      mediaDurationSeconds: post.mediaDurationSeconds,
      createdAt: post.createdAt,
      reactions: counts,
      viewerReaction,
    };
  });

  return c.json({ posts: formatted });
});

export default profile;
