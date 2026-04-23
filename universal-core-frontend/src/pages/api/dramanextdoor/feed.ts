import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { cursor, limit = 20, userId = "anon" } = req.query;

  const clips = await prisma.dramaClip.findMany({
    take: Number(limit),
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      favorites: {
        where: { userId },
        select: { id: true }
      }
    }
  });

  const nextCursor = clips.length === Number(limit)
    ? clips[clips.length - 1].id
    : null;

  const items = clips.map((clip) => ({
    ...clip,
    userHasFavorited: clip.favorites.length > 0
  }));

  res.status(200).json({ items, nextCursor });
}
