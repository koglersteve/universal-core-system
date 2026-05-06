// src/core/feed/trending.ts

import type { Post } from "@/types/jokes";
import { getReactionCounts } from "@/core/reactions/reactionStore";

export type TrendingPost = Post & { score: number };

export function getTrendingPosts(posts: Post[]): TrendingPost[] {
  return posts
    .map((post) => {
      const counts = getReactionCounts(post.id);

      // Trending score emphasizes intensity + recency
      const score =
        counts.mindblown * 5 +
        counts.shock * 3 +
        counts.laugh * 2 +
        counts.smile * 1 +
        counts.expressionless * 0 +
        counts.angry * -1 +
        counts.crickets * -2;

      return { ...post, score };
    })
    .sort((a, b) => b.score - a.score);
}

