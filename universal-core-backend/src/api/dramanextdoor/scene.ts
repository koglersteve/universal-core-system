import { prisma } from "../../lib/prisma";

export async function generateScene(req, res) {
  try {
    const { prompt } = req.body;

    // Replace this with your actual scene generation logic
    const scene = await prisma.scene.create({
      data: { prompt }
    });

    return res.json({ ok: true, scene });
  } catch (err) {
    console.error("Scene generation error:", err);
    return res.status(500).json({ ok: false, error: "Failed to generate scene" });
  }
}
