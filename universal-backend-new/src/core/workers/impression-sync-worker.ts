// src/core/workers/impression-sync-worker.ts

import { onEvent } from "../events/subscriber.js";
import { EVENT_TYPES } from "../events/event-types.js";
import { prisma } from "../../prisma.js"; // FIXED
import { getEnabledApps } from "../apps/registry.js";
import { createId } from "../utils/id.js";

type ImpressionFanoutPayload = {
  userId: string;
  postId: string;
  appId: string;
  timestamp?: number;
};

onEvent(EVENT_TYPES.IMPRESSION_FANOUT_REQUEST, async (event: ImpressionFanoutPayload) => {
  try {
    const apps = getEnabledApps();
    const timestamp = event.timestamp ?? Date.now();

    for (const app of apps) {
      await prisma.impression.create({
        data: {
          id: createId(),
          userId: event.userId,
          appId: app.id,
          postId: event.postId,
          timestamp: new Date(timestamp),
        },
      });
    }
  } catch (err) {
    console.error("Impression sync worker failed:", err);
  }
});
