// src/core/reactions/stream.ts

import type { ReactionEvent } from "@/types/os";

let events: ReactionEvent[] = [];

/**
 * Emit a reaction event into the in-memory stream.
 */
export function emitReactionStreamEvent(event: ReactionEvent) {
  events.push(event);
}

/**
 * Return all reaction events.
 */
export function getAllEvents(): ReactionEvent[] {
  return events;
}
