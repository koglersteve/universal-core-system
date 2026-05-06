// src/core/reactions/propagationLog.ts

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

export type LocalReactionEvent = {
  postId: string;
  emoji: ReactionEmojiKey;
  timestamp: number;
};

export type PropagationAction = {
  from: ReactionEmojiKey;
  to: ReactionEmojiKey;
  weight: number;
  channel: "local" | "global";
};

export type PropagationLogEntry = {
  event: LocalReactionEvent;
  action: PropagationAction;
  timestamp: number;
};

let log: PropagationLogEntry[] = [];

export function recordPropagation(
  event: LocalReactionEvent,
  action: PropagationAction
) {
  log.push({
    event,
    action,
    timestamp: Date.now(),
  });
}

export function getPropagationLog() {
  return log;
}

export function clearPropagationLog() {
  log = [];
}
