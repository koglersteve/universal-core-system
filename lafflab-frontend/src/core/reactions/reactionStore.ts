// src/core/reactions/reactionStore.ts

import type { ReactionEmojiKey, ReactionCounts } from "@/types/os";

const store: Record<string, ReactionCounts> = {};

function emptyCounts(): ReactionCounts {
  return {
    laugh: 0,
    smile: 0,
    expressionless: 0,
    shock: 0,
    mindblown: 0,
    angry: 0,
    crickets: 0,
  };
}

export function addReaction(postId: string, emoji: ReactionEmojiKey) {
  if (!store[postId]) {
    store[postId] = emptyCounts();
  }
  store[postId][emoji] += 1;
}

export function getAggregatedCounts(postId: string): ReactionCounts {
  return store[postId] ?? emptyCounts();
}
