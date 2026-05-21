// src/core/workers/reaction-fanout-worker.ts

import { onEvent } from "../events/subscriber";
import { EVENT_TYPES } from "../events/event-types";
import { fanOutReaction } from "../reactions/fanout-service";
import { storeReaction } from "../reactions/reaction-service";
import { publishEvent } from "../events/publisher";

onEvent(EVENT_TYPES.REACTION_FANOUT_REQUEST, async (event) => {
  try {
    // 1. Store the original reaction
    await storeReaction(event);

    // 2. Fan out to all apps
    await fanOutReaction(event);

    // 3. Notify analytics worker
    publishEvent(EVENT_TYPES.REACTION_STORED, event);
  } catch (err) {
    console.error("Reaction fanout worker failed:", err);
  }
});
