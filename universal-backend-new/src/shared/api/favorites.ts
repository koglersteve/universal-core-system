import prisma from "./prisma";

export async function toggleFavorite(id: string, userId: string | null = null) {
  const existing = await prisma.favorite.findUnique({
    where: { id }
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id } });
    return { favorited: false };
  }

  const created = await prisma.favorite.create({
    data: {
      id,
      itemId: id,
      userId: userId || "anonymous"
    }
  });

  return { favorited: true, favorite: created };
}

export async function getFavorites(userId: string | null = null) {
  return prisma.favorite.findMany({
    where: { userId: userId || "anonymous" }
  });
}
