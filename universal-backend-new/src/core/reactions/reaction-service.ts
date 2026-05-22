// src/core/reactions/reaction-service.ts

import { prisma } from "../../prisma.js"; // FIXED
import { publishEvent } from "../events/publisher.js";
import { EVENT_TYPES } from "../events/event-types.js";
import type { LocalReactionEvent } from "./reaction-types.js";

export async function storeReaction(event: LocalReactionEvent) {
  await prisma.reaction.create({
    data: {
      id: event.id,
      userId: event.userId,
      appId: event.appId,
      postId: event.postId,
      emoji: event.emoji,
      timestamp: new Date(event.timestamp),
    },
  });

  publishEvent(EVENT_TYPES.REACTION_STORED, event);
}
