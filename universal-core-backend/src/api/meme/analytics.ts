import { prisma } from "../../lib/prisma";

export async function getMemeAnalytics(req, res) {
  try {
    const total = await prisma.meme.count();

    return res.json({
      ok: true,
      analytics: { totalMemes: total }
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return res.status(500).json({ ok: false, error: "Failed to load analytics" });
  }
}
