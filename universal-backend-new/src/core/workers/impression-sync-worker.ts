// src/core/workers/impression-sync-worker.ts

import { onEvent } from "../events/subscriber";
import { EVENT_TYPES } from "../events/event-types";
import { prisma } from "../../prisma"; // adjust if needed
import { getEnabledApps } from "../apps/registry";
import { createId } from "../utils/id";

onEvent(EVENT_TYPES.IMPRESSION_FANOUT_REQUEST, async (event) => {
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

    // Notify analytics worker
    // (optional but recommended)
    // publishEvent(EVENT_TYPES.IMPRESSION_STORED, event);

  } catch (err) {
    console.error("Impression sync worker failed:", err);
  }
});
