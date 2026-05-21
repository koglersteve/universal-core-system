// src/core/routes/reactions/post-reaction.ts

import type { Request, Response } from "express";
import { createId } from "../../utils/id";
import { publishEvent } from "../../events/publisher";
import { EVENT_TYPES } from "../../events/event-types";

export async function postReaction(req: Request, res: Response) {
  try {
    const { userId, postId, emoji, appId } = req.body;

    if (!userId || !postId || !emoji || !appId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const event = {
      id: createId(),
      userId,
      postId,
      emoji,
      appId,
      timestamp: Date.now(),
    };

    // Kick off the backend fanout pipeline
    publishEvent(EVENT_TYPES.REACTION_FANOUT_REQUEST, event);

    return res.json({ success: true });
  } catch (err) {
    console.error("Error posting reaction:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
