import type { ReactionEvent } from "./types";
import type { PropagationAction } from "./propagationConfig";

export type ReactionStreamEvent = {
  event: ReactionEvent;
  propagation: PropagationAction[];
  timestamp: string;
};

const listeners = new Set<(e: ReactionStreamEvent) => void>();

export function emitReactionStreamEvent(
  event: ReactionEvent,
  propagation: PropagationAction[]
) {
  const payload: ReactionStreamEvent = {
    event,
    propagation,
    timestamp: new Date().toISOString(),
  };

  listeners.forEach((fn) => fn(payload));
}

export function subscribeToReactionStream(
  fn: (e: ReactionStreamEvent) => void
) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
