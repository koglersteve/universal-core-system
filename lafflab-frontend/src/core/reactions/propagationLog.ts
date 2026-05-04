import type { ReactionEvent, PropagationAction } from "@/types/os";

export type PropagationLogEntry = {
  event: ReactionEvent;
  action: PropagationAction;
  timestamp: string;
};

const log: PropagationLogEntry[] = [];

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

export function getPropagationLog(): PropagationLogEntry[] {
  return [...log];
}
