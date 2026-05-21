// src/core/workers/analytics-worker.ts

import { onEvent } from "../events/subscriber";
import { EVENT_TYPES } from "../events/event-types";
import { prisma } from "../../prisma"; // adjust if needed

// Reaction analytics
onEvent(EVENT_TYPES.REACTION_STORED, async (event) => {
  try {
    await prisma.analyticsEvent.create({
      data: {
        type: "reaction",
        userId: event.userId,
        appId: event.appId,
        postId: event.postId,
        emoji: event.emoji,
        timestamp: new Date(event.timestamp),
      },
    });
  } catch (err) {
    console.error("Analytics worker failed (reaction):", err);
  }
});

// Impression analytics
onEvent(EVENT_TYPES.IMPRESSION_STORED, async (event) => {
  try {
    await prisma.analyticsEvent.create({
      data: {
        type: "impression",
        userId: event.userId,
        appId: event.appId,
        postId: event.postId,
        timestamp: new Date(event.timestamp),
      },
    });
  } catch (err) {
    console.error("Analytics worker failed (impression):", err);
  }
});
