// src/core/reactions/stream.ts

import type { ReactionStreamEvent } from "@/types/os";

let events: ReactionStreamEvent[] = [];

/**
 * Emit a reaction event into the in-memory stream.
 */
export function emitReactionStreamEvent(event: ReactionStreamEvent) {
  events.push(event);
}

/**
 * Return all reaction events.
 */
export function getAllEvents(): ReactionStreamEvent[] {
  return events;
}
