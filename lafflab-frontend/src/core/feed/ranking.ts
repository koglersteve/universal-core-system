// src/core/feed/ranking.ts

import type { Post } from "@/types/jokes";
import { getAggregatedCounts } from "@/core/reactions/reactionStore";

export type RankedPost = Post & { score: number };

export function rankPosts(posts: Post[]): RankedPost[] {
  return posts.map((post) => {
    const counts = getAggregatedCounts(post.id);

    const score =
      counts.laugh * 5 +
      counts.smile * 3 +
      counts.expressionless * 0 +
      counts.shock * 4 +
      counts.mindblown * 6 +
      counts.angry * -2 +
      counts.crickets * -1;

    return {
      ...post,
      score,
    };
  });
}
