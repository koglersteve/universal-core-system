// src/core/reactions/reactionStore.ts

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

export type ReactionCounts = Record<ReactionEmojiKey, number>;

const store: Record<string, ReactionCounts> = {};

export function initReactionCounts(postId: string) {
  if (!store[postId]) {
    store[postId] = {
      laugh: 0,
      smile: 0,
      expressionless: 0,
      shock: 0,
      mindblown: 0,
      angry: 0,
      crickets: 0,
    };
  }
}

export function addReaction(postId: string, emoji: ReactionEmojiKey) {
  initReactionCounts(postId);
  store[postId][emoji] += 1;
}

export function getReactionCounts(postId: string): ReactionCounts {
  initReactionCounts(postId);
  return store[postId];
}

export function clearReactionStore() {
  for (const key in store) {
    delete store[key];
  }
}
