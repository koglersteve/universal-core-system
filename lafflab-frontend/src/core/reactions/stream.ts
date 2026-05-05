// src/core/reactions/stream.ts

import type { ReactionEvent } from "@/types/os";

/**
 * In‑memory event stream for all reaction events.
 */

const listeners = new Set<(event: ReactionEvent) => void>();

export function emitReaction(event: ReactionEvent) {
  listeners.forEach((fn) => fn(event));
}

export function subscribeToReactions(
  fn: (event: ReactionEvent) => void
): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
