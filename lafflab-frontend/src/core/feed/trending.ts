// src/core/feed/trending.ts

import type { Post } from "@/types/jokes";
import { getAggregatedCounts } from "@/core/reactions/engine";

export type TrendingPost = Post & { score: number };

/**
 * Trending score emphasizes high‑energy reactions (laugh, shock, mindblown)
 * and penalizes negative or low‑engagement signals.
 */
export function scorePostForTrending(post: Post): number {
  const counts = getAggregatedCounts(post.id);

  // Canonical Emotional OS reaction keys
  const laugh = counts.laugh || 0;
  const smile = counts.smile || 0;
  const shock = counts.shock || 0;
  const mindblown = counts.mindblown || 0;
  const expressionless = counts.expressionless || 0;
  const angry = counts.angry || 0;
  const crickets = counts.crickets || 0;

  // Trending emphasizes high‑energy reactions
  const positive =
    laugh * 3 +
    smile * 2 +
    shock * 3 +
    mindblown * 5;

  // Neutral and negative penalties
  const neutralPenalty = expressionless * 0.5;
  const negativePenalty = angry * 1.5 + crickets * 2;

  const base = positive - neutralPenalty - negativePenalty;

  // Trending decays faster than For You — 24‑hour half‑life
  const ageMs = Date.now() - new Date(post.createdAt).getTime();
  const ageHours = ageMs / (1000 * 60 * 60);
  const decay = Math.max(0.1, 1 - ageHours / 24);

  return base * decay;
}

export function rankPostsForTrending(posts: Post[]): TrendingPost[] {
  return posts
    .map((p) => ({
      ...p,
      score: scorePostForTrending(p),
    }))
    .sort((a, b) => b.score - a.score);
}

