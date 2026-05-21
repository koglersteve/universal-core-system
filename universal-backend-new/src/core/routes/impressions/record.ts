// src/core/routes/impressions/record.ts

import type { Request, Response } from "express";
import { publishEvent } from "../../events/publisher";
import { EVENT_TYPES } from "../../events/event-types";
import { createId } from "../../utils/id";

export async function recordImpression(req: Request, res: Response) {
  try {
    const { userId, postId, appId } = req.body;

    if (!userId || !postId || !appId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const event = {
      id: createId(),
      userId,
      postId,
      appId,
      timestamp: Date.now(),
    };

    publishEvent(EVENT_TYPES.IMPRESSION_FANOUT_REQUEST, event);

    return res.json({ success: true });
  } catch (err) {
    console.error("Error recording impression:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
