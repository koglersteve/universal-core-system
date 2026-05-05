// src/core/reactions/stream.ts

import type { ReactionEvent } from "@/types/os";

/**
 * In‑memory event stream for all reaction events.
 */

let events: ReactionEvent[] = [];

const listeners = new Set<(event: ReactionEvent) => void>();

export function emitReaction(event: ReactionEvent) {
  events.push(event);
  listeners.forEach((fn) => fn(event));
}

export function getAllEvents(): ReactionEvent[] {
  return events;
}

export function subscribeToReactions(
  fn: (event: ReactionEvent) => void
): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

