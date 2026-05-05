// src/core/reactions/stream.ts

import type { ReactionStreamEvent } from "@/types/os";

/**
 * In‑memory event stream for all reaction events.
 */
let events: ReactionStreamEvent[] = [];

/**
 * Push a new reaction event into the stream.
 */
export function emitReactionStreamEvent(event: ReactionStreamEvent) {
  events.push(event);
}

/**
 * Retrieve all reaction events.
 */
export function getAllEvents(): ReactionStreamEvent[] {
  return events;
}
