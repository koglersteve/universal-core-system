import { prisma } from "../lib/prisma";

export async function favorites(req, res) {
  try {
    const { userId = "anon" } = req.query;

    const items = await prisma.dramaFavorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { clip: true }
    });

    res.json({ items: items.map(f => f.clip) });
  } catch (err) {
    console.error("Favorites error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
