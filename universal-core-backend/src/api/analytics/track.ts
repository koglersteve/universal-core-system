import { prisma } from "../../lib/prisma";

export async function trackEvent(req, res) {
  try {
    const { event, payload } = req.body;

    const saved = await prisma.trackingEvent.create({
      data: {
        event,
        payload: payload ?? {}
      }
    });

    return res.json({ ok: true, saved });
  } catch (err) {
    console.error("Track event error:", err);
    return res.status(500).json({ ok: false, error: "Failed to track event" });
  }
}
