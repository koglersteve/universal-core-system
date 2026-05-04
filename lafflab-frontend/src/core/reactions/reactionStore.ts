// lafflab-frontend/src/core/reactions/reactionStore.ts

/**
 * Minimal in-memory reaction store.
 * This satisfies engine.ts and propagationConfig.ts imports.
 */

export type ReactionCounts = {
  laugh: number;
  smile: number;
  shock: number;
  mindblown: number;
};

// In-memory store keyed by postId
const store: Record<string, ReactionCounts> = {};

/**
 * Returns aggregated reaction counts for a post.
 * Always returns a fully populated object (strict‑safe).
 */
export function getAggregatedCounts(postId: string): ReactionCounts {
  const counts = store[postId];

  return {
    laugh: counts?.laugh ?? 0,
    smile: counts?.smile ?? 0,
    shock: counts?.shock ?? 0,
    mindblown: counts?.mindblown ?? 0,
  };
}

/**
 * Increment a reaction count for a post.
 */
export function addReaction(postId: string, emoji: keyof ReactionCounts) {
  if (!store[postId]) {
    store[postId] = {
      laugh: 0,
      smile: 0,
      shock: 0,
      mindblown: 0,
    };
  }

  store[postId][emoji] += 1;
}
