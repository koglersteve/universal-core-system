import { prisma } from "../lib/prisma";

export async function favorite(req, res) {
  try {
    const { userId, clipId } = req.body;

    await prisma.dramaFavorite.create({
      data: { userId, clipId }
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Favorite error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
