import { prisma } from "@/lib/prisma";

export async function isFollowing(followerId: string, followingId: string) {
  const follow = await prisma.follow.findFirst({
    where: { followerId, followingId },
  });
  return !!follow;
}

export async function getFollowerCount(userId: string) {
  return prisma.follow.count({
    where: { followingId: userId },
  });
}

export async function getFollowingCount(userId: string) {
  return prisma.follow.count({
    where: { followerId: userId },
  });
}
