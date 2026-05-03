import type { ReactionEvent } from "./types";
import type { PropagationAction } from "./propagationConfig";

export type ReactionStreamEvent = {
  event: ReactionEvent;
  propagation: PropagationAction[];
  timestamp: string;
};

type ReactionStreamListener = (e: ReactionStreamEvent) => void;

const listeners = new Set<ReactionStreamListener>();

/**
 * Emit a reaction stream event to all subscribers.
 * This is the OS-level emotional event bus.
 */
export function emitReactionStreamEvent(
  event: ReactionEvent,
  propagation: PropagationAction[]
) {
  const payload: ReactionStreamEvent = {
    event,
    propagation,
    timestamp: new Date().toISOString(),
  };

  for (const listener of listeners) {
    listener(payload);
  }
}

/**
 * Subscribe to the global reaction stream.
 * Returns an unsubscribe function.
 */
export function subscribeToReactionStream(
  fn: ReactionStreamListener
): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
