// src/types/os/Reactions.ts

export type ReactionEmojiKey =
  | "laugh"
  | "love"
  | "wow"
  | "sad"
  | "angry";

export type ReactionCounts = {
  laugh: number;
  love: number;
  wow: number;
  sad: number;
  angry: number;
};

export type ReactionEvent = {
  postId: string;
  userId: string;
  emoji: ReactionEmojiKey;
  timestamp: number;
};

