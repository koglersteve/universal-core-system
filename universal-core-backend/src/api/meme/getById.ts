import { prisma } from "../../lib/prisma";

export async function getMemeById(req, res) {
  try {
    const { id } = req.params;

    const meme = await prisma.meme.findUnique({
      where: { id }
    });

    if (!meme) {
      return res.status(404).json({ ok: false, error: "Meme not found" });
    }

    return res.json({ ok: true, meme });
  } catch (err) {
    console.error("Meme fetch error:", err);
    return res.status(500).json({ ok: false, error: "Failed to load meme" });
  }
}
