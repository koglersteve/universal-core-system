import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { clipId, userId = "anon" } = req.body;

  const existing = await prisma.dramaFavorite.findFirst({
    where: { clipId, userId }
  });

  if (existing) {
    await prisma.dramaFavorite.delete({ where: { id: existing.id } });
    return res.status(200).json({ favorited: false });
  }

  await prisma.dramaFavorite.create({
    data: { clipId, userId }
  });

  res.status(200).json({ favorited: true });
}
