// src/core/feed/ranking.ts

import type { Post } from "@/types/jokes";
import { getAggregatedCounts } from "@/core/reactions/engine";

export type RankedPost = Post & { score: number };

/**
 * Score a post for the "For You" feed using the canonical 7‑emoji Emotional OS model.
 */
export function scorePostForForYou(post: Post): number {
  const counts = getAggregatedCounts(post.id);

  // Canonical Emotional OS reaction keys
  const laugh = counts.laugh || 0;
  const smile = counts.smile || 0;
  const expressionless = counts.expressionless || 0;
  const shock = counts.shock || 0;
  const mindblown = counts.mindblown || 0;
  const angry = counts.angry || 0;
  const crickets = counts.crickets || 0;

  // Positive emotional weight
  const positive =
    laugh * 3 +
    smile * 2 +
    mindblown * 5 +
    shock * 2.5;

  // Neutral penalty
  const neutralPenalty = expressionless * 0.5;

  // Negative penalty
  const negativePenalty =
    angry * 1.5 +
    crickets * 2;

  const base = positive - neutralPenalty - negativePenalty;

  // Time decay: fades over 48 hours
  const ageMs = Date.now() - new Date(post.createdAt).getTime();
  const ageHours = ageMs / (1000 * 60 * 60);
  const decay = Math.max(0.2, 1 - ageHours / 48);

  return base * decay;
}

export function rankPostsForForYou(posts: Post[]): RankedPost[] {
  return posts
    .map((p) => ({
      ...p,
      score: scorePostForForYou(p),
    }))
    .sort((a, b) => b.score - a.score);
}
