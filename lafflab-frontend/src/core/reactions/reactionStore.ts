// lafflab-frontend/src/core/reactions/reactionStore.ts

/**
 * In-memory reaction store for all 7 LAFFLab emojis.
 * Supports aggregation + mutation for propagation + analytics engines.
 */

export type ReactionCounts = {
  hysterical: number;
  laughing: number;
  expressionless: number;
  shock: number;
  mindblown: number;
  angry: number;
  crickets: number;
};

// In-memory store keyed by postId
const store: Record<string, ReactionCounts> = {};

/**
 * Returns aggregated reaction counts for a post.
 * Always returns a fully populated object (strict-safe).
 */
export function getAggregatedCounts(postId: string): ReactionCounts {
  const counts = store[postId];

  return {
    hysterical: counts?.hysterical ?? 0,
    laughing: counts?.laughing ?? 0,
    expressionless: counts?.expressionless ?? 0,
    shock: counts?.shock ?? 0,
    mindblown: counts?.mindblown ?? 0,
    angry: counts?.angry ?? 0,
    crickets: counts?.crickets ?? 0,
  };
}

/**
 * Increment a reaction count for a post.
 */
export function addReaction(
  postId: string,
  emoji: keyof ReactionCounts
) {
  if (!store[postId]) {
    store[postId] = {
      hysterical: 0,
      laughing: 0,
      expressionless: 0,
      shock: 0,
      mindblown: 0,
      angry: 0,
      crickets: 0,
    };
  }

  store[postId][emoji] += 1;
}
