// src/core/reactions/fanout-service.ts

import { getEnabledApps } from "../apps/registry.js";
import { createId } from "../utils/id.js";
import { publishEvent } from "../events/publisher.js";
import { EVENT_TYPES } from "../events/event-types.js";
import type { LocalReactionEvent } from "./reaction-types.js";

export async function fanOutReaction(event: LocalReactionEvent) {
  const apps = getEnabledApps();
  const timestamp = event.timestamp ?? Date.now();

  for (const app of apps) {
    const cloned: LocalReactionEvent = {
      id: createId(),
      userId: event.userId,
      appId: app.id,
      postId: event.postId,
      emoji: event.emoji,
      timestamp,
    };

    publishEvent(EVENT_TYPES.STREAM_BROADCAST, cloned);
    publishEvent(EVENT_TYPES.REACTION_FANOUT_REQUEST, cloned);
  }
}
