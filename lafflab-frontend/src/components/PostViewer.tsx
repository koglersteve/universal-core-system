import { prisma } from "@/lib/prisma";

// Get all posts
export async function getPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Get posts by a specific user
export async function getPostsByUser(userId: string) {
  return prisma.post.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
