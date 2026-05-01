import { prisma } from "@/lib/prisma";

export async function getHistory(userId: string) {
  return prisma.history.findMany({
    where: { userId },
    orderBy: { viewedAt: "desc" }
  });
}

export async function addHistory(userId: string, jokeId: string) {
  return prisma.history.create({
    data: { userId, jokeId, viewedAt: Date.now() }
  });
}

export async function clearHistory(userId: string) {
  return prisma.history.deleteMany({ where: { userId } });
}
