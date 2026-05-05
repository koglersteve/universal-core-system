// src/core/reactions/reactionStore.ts

import { ReactionCounts, ReactionEmojiKey } from "@/types/os";

const store: Record<string, ReactionCounts> = {};

/**
 * Ensure a post has an initialized reaction count object.
 */
function ensure(postId: string): ReactionCounts {
  if (!store[postId]) {
    store[postId] = {
      laugh: 0,
      smile: 0,
      shock: 0,
      expressionless: 0,
      angry: 0,
      mindblown: 0,
      crickets: 0,
    };
  }
  return store[postId];
}

/**
 * Add a reaction to a post.
 */
export function addReaction(postId: string, emoji: ReactionEmojiKey) {
  const counts = ensure(postId);
  counts[emoji] += 1;
}

/**
 * Get aggregated counts for a post.
 */
export function getAggregatedCounts(postId: string): ReactionCounts {
  return ensure(postId);
}
