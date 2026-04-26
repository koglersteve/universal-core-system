import { prisma } from "../lib/prisma";

export async function history(req, res) {
  try {
    const { userId = "anon" } = req.query;

    const views = await prisma.dramaView.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { clip: true }
    });

    res.json({ items: views.map(v => v.clip) });
  } catch (err) {
    console.error("History error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
