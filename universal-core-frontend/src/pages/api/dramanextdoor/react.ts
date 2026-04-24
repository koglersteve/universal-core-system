import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

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

  res.status(200).json({ ok: true });
}
