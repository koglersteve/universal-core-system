import { prisma } from "../../lib/prisma";

export async function saveMeme(req, res) {
  try {
    const { title, mood, world, trait, agent, layers } = req.body;

    const meme = await prisma.meme.create({
      data: { title, mood, world, trait, agent, layers }
    });

    return res.json({ ok: true, meme });
  } catch (err) {
    console.error("Save meme error:", err);
    return res.status(500).json({ ok: false, error: "Failed to save meme" });
  }
}
