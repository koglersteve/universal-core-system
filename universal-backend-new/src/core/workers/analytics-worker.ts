// src/core/workers/analytics-worker.ts

import { onEvent } from "../events/subscriber.js";
import { EVENT_TYPES } from "../events/event-types.js";
import { prisma } from "../../prisma.js"; // FIXED

type AnalyticsEventPayload = {
  userId: string;
  appId: string;
  postId: string;
  emoji?: string;
  timestamp: number;
};

onEvent(EVENT_TYPES.REACTION_STORED, async (event: AnalyticsEventPayload) => {
  try {
    await prisma.analyticsEvent.create({
      data: {
        type: "reaction",
        userId: event.userId,
        appId: event.appId,
        postId: event.postId,
        emoji: event.emoji ?? null,
        timestamp: new Date(event.timestamp),
      },
    });
  } catch (err) {
    console.error("Analytics worker failed (reaction):", err);
  }
});

onEvent(EVENT_TYPES.IMPRESSION_STORED, async (event: AnalyticsEventPayload) => {
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
