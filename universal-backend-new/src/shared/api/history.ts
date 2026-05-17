import prisma from "./prisma";

export async function getHistory() {
  return prisma.history.findMany({
    orderBy: { viewedAt: "desc" }
  });
}

export async function addHistory(jokeId: string, userId: string | null = null) {
  return prisma.history.create({
    data: {
      jokeId,
      userId: userId || "anonymous"
    }
  });
}
