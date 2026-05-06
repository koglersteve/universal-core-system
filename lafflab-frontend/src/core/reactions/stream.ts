// src/core/reactions/stream.ts

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

/**
 * In‑memory event stream for all reaction events.
 */

let events: LocalReactionEvent[] = [];

export function emitReactionStreamEvent(event: LocalReactionEvent) {
  events.push(event);
}

export function getAllEvents(): LocalReactionEvent[] {
  return events;
}

export function clearReactionStream() {
  events = [];
}

