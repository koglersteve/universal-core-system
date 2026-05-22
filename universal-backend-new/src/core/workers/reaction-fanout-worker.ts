// src/core/workers/reaction-fanout-worker.ts

import { onEvent } from "../events/subscriber.js";
import { EVENT_TYPES } from "../events/event-types.js";
import { fanOutReaction } from "../reactions/fanout-service.js";
import { storeReaction } from "../reactions/reaction-service.js";
import { publishEvent } from "../events/publisher.js";
import type { LocalReactionEvent } from "../reactions/reaction-types.js";

onEvent(EVENT_TYPES.REACTION_FANOUT_REQUEST, async (event: LocalReactionEvent) => {
  try {
    await storeReaction(event);
    await fanOutReaction(event);
    publishEvent(EVENT_TYPES.REACTION_STORED, event);
  } catch (err) {
    console.error("Reaction fanout worker failed:", err);
  }
});
