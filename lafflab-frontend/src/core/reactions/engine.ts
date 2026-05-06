// src/core/reactions/engine.ts

export type LocalReactionEvent = {
  postId: string;
  emoji: string;
  timestamp: number;
};

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

export function createReactionEvent(
  postId: string,
  emoji: ReactionEmojiKey
): LocalReactionEvent {
  return {
    postId,
    emoji,
    timestamp: Date.now(),
  };
}
