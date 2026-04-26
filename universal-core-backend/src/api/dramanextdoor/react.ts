import { prisma } from "../lib/prisma";

export async function react(req, res) {
  try {
    const { clipId, reaction } = req.body;

    const valid = [
      "laugh",
      "smile",
      "shock",
      "sad",
      "angry",
      "mindblown",
      "chaos"
    ];

    if (!valid.includes(reaction)) {
      return res.status(400).json({ error: "Invalid reaction" });
    }

    await prisma.dramaClip.update({
      where: { id: clipId },
      data: { [reaction]: { increment: 1 } }
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("React error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
