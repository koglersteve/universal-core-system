import { Hono } from "hono";
import { prisma } from "../../../src/core/config/prisma"; // adjust if needed

const follow = new Hono();

// POST /lafflab/follow/:username
follow.post("/follow/:username", async c => {
  const userId = c.get("userId") as string | undefined;
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const { username } = c.req.param();

  const target = await prisma.user.findUnique({
    where: { username },
  });

  if (!target) return c.json({ error: "User not found" }, 404);
  if (target.id === userId) {
    return c.json({ error: "Cannot follow yourself" }, 400);
  }

  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: target.id,
      },
    },
  });

  if (existing) {
    await prisma.follow.delete({ where: { id: existing.id } });
  } else {
    await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: target.id,
      },
    });
  }

  const followerCount = await prisma.follow.count({
    where: { followingId: target.id },
  });

  const followingCount = await prisma.follow.count({
    where: { followerId: target.id },
  });

  return c.json({
    username,
    following: !existing,
    followerCount,
    followingCount,
  });
});

export default follow;
