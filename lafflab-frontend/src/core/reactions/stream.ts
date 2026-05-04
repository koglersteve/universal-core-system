import type { ReactionEvent, PropagationAction } from "@/types/os";

export type ReactionStreamEvent = {
  event: ReactionEvent;
  propagation: PropagationAction[];
  timestamp: string;
};

type ReactionStreamListener = (e: ReactionStreamEvent) => void;

const listeners = new Set<ReactionStreamListener>();

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

export function subscribeToReactionStream(
  fn: ReactionStreamListener
): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
