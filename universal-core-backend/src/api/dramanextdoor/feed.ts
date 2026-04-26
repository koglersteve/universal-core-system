import { prisma } from "../lib/prisma";

export async function feed(req, res) {
  try {
    const clips = await prisma.dramaClip.findMany({
      orderBy: { createdAt: "desc" },
      take: 50
    });

    res.json({ items: clips });
  } catch (err) {
    console.error("Feed error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
