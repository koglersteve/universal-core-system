import { prisma } from "../lib/prisma";

export async function post(req, res) {
  try {
    const { type, url, thumbnail, duration } = req.body;

    const valid = ["video", "audio", "image", "meme"];
    if (!valid.includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    const clip = await prisma.dramaClip.create({
      data: { type, url, thumbnail, duration }
    });

    res.json({ clip });
  } catch (err) {
    console.error("Post error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
