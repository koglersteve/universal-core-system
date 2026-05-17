// src/modules/services/useHistory.ts
import prisma from "../../shared/api/prisma";

export async function getHistory(userId: string) {
  return prisma.history.findMany({
    where: { userId },
    orderBy: { viewedAt: "desc" },
  });
}

export async function addHistory(userId: string, jokeId: string) {
  return prisma.history.create({
    data: {
      userId,
      jokeId,
      viewedAt: new Date(),
    },
  });
}

export async function clearHistory(userId: string) {
  return prisma.history.deleteMany({
    where: { userId },
  });
}
