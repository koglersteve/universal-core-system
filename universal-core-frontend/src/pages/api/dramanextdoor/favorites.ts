import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { userId = "anon" } = req.query;

  const favorites = await prisma.dramaFavorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { clip: true }
  });

  res.status(200).json({ items: favorites.map(f => f.clip) });
}
