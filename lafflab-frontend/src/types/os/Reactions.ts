// src/types/os/Reactions.ts

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

export type ReactionCounts = {
  laugh: number;
  smile: number;
  expressionless: number;
  shock: number;
  mindblown: number;
  angry: number;
  crickets: number;
};

export type ReactionEvent = {
  postId: string;
  userId: string;
  emoji: ReactionEmojiKey;
  timestamp: number;
};

