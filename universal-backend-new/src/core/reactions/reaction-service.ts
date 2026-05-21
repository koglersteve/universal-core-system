// src/core/reactions/reaction-service.ts

import { prisma } from "../../prisma"; // adjust if needed
import { publishEvent } from "../events/publisher";
import { EVENT_TYPES } from "../events/event-types";
import type { LocalReactionEvent } from "./reaction-types";

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
