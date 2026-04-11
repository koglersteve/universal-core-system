import { prisma } from "../../lib/prisma";

export async function getStreamAnalytics(req, res) {
  try {
    // Replace with your real stream analytics logic
    const streams = await prisma.streamEvent.findMany({
      select: { id: true, duration: true, createdAt: true }
    });

    return res.json({
      ok: true,
      stream: {
        totalStreams: streams.length,
        streams
      }
    });
  } catch (err) {
    console.error("Stream analytics error:", err);
    return res.status(500).json({ ok: false, error: "Failed to load stream analytics" });
  }
}
