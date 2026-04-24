import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { type, url, thumbnail, duration } = req.body;

  const valid = ["video", "audio", "image", "meme"];
  if (!valid.includes(type)) {
    return res.status(400).json({ error: "Invalid type" });
  }

  const clip = await prisma.dramaClip.create({
    data: {
      type,
      url,
      thumbnail,
      duration
    }
  });

  res.status(200).json({ clip });
}
