import { prisma } from "@/lib/prisma";

export async function getUser() {
  return { user: null, session: null };
}

export async function getUserIdentity() {
  return null;
}

export async function getUserById(id: string) {
  if (!id) return null;

  return prisma.user.findUnique({
    where: { id },
  });
}

export async function getUserByUsername(username: string) {
  if (!username) return null;

  return prisma.user.findUnique({
    where: { username },
  });
}

export async function updateUserProfile({
  id,
  username,
  avatarUrl,
  bio,
}: {
  id: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
}) {
  return prisma.user.update({
    where: { id },
    data: {
      username,
      avatarUrl,
      bio,
    },
  });
}

export async function getPostCount(userId: string) {
  return prisma.post.count({
    where: { userId },
  });
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
