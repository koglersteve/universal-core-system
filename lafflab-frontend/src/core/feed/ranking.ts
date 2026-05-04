// src/core/feed/ranking.ts

import type { Post } from "@/types/jokes";
import { getAggregatedCounts } from "@/core/reactions/engine";

export type RankedPost = Post & { score: number };

/**
 * Score a post for the "For You" feed using 7‑emoji emotional heat.
 */
export function scorePostForForYou(post: Post): number {
  const counts = getAggregatedCounts(post.id);

  const hysterical = counts.hysterical || 0;
  const laughing = counts.laughing || 0;
  const mindblown = counts.mindblown || 0;
  const crickets = counts.crickets || 0;

  const positive =
    hysterical * 4 + laughing * 3 + mindblown * 5;
  const neutralPenalty = (counts.expressionless || 0) * 0.5;
  const negativePenalty =
    (counts.angry || 0) * 1.5 + crickets * 2;

  const base = positive - neutralPenalty - negativePenalty;

  const ageMs = Date.now() - new Date(post.createdAt).getTime();
  const ageHours = ageMs / (1000 * 60 * 60);
  const decay = Math.max(0.2, 1 - ageHours / 48); // decays over 2 days

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
