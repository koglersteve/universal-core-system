import { prisma } from "../../lib/prisma";

export async function getNarrativeAnalytics(req, res) {
  try {
    // Replace with your real narrative analytics logic
    const scenes = await prisma.scene.findMany({
      select: { id: true, createdAt: true }
    });

    return res.json({
      ok: true,
      narrative: {
        totalScenes: scenes.length,
        scenes
      }
    });
  } catch (err) {
    console.error("Narrative analytics error:", err);
    return res.status(500).json({ ok: false, error: "Failed to load narrative analytics" });
  }
}
