// src/core/reactions/propagationLog.ts

import type { ReactionEvent, PropagationAction } from "@/types/os";

export type PropagationLogEntry = {
  event: ReactionEvent;
  action: PropagationAction;
  timestamp: string;
};

const log: PropagationLogEntry[] = [];

/**
 * Append a propagation action to the in‑memory log.
 */
export function logPropagation(
  event: ReactionEvent,
  action: PropagationAction
) {
  log.push({
    event,
    action,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Return a copy of the propagation log.
 */
export function getPropagationLog(): PropagationLogEntry[] {
  return [...log];
}
