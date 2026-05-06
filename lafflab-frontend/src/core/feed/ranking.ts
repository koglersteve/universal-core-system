// src/core/feed/ranking.ts

import type { Post } from "@/types/jokes";
import { getReactionCounts } from "@/core/reactions/reactionStore";

export type RankedPost = Post & { score: number };

export function rankPosts(posts: Post[]): RankedPost[] {
  return posts
    .map((post) => {
      const counts = getReactionCounts(post.id);

      const score =
        counts.laugh * 3 +
        counts.smile * 2 +
        counts.expressionless * 0 +
        counts.shock * 1 +
        counts.mindblown * 4 +
        counts.angry * -1 +
        counts.crickets * -2;

      return { ...post, score };
    })
    .sort((a, b) => b.score - a.score);
}
