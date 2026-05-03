import type { ReactionEvent } from "./types";
import type { PropagationAction } from "./propagationConfig";

export type PropagationLogEntry = {
  event: ReactionEvent;
  action: PropagationAction;
  timestamp: string;
};

const log: PropagationLogEntry[] = [];

/**
 * Store a propagation action for debugging + analytics
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
 * Return all logged propagation actions
 */
export function getPropagationLog(): PropagationLogEntry[] {
  return [...log];
}
