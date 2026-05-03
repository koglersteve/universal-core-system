import type { Post } from "@/types/jokes";
import { getAllEvents, getAggregatedCounts } from "@/core/reactions/engine";

export type TrendingPost = Post & { trendScore: number };

function computeVelocity(postId: string): number {
  const events = getAllEvents().filter((e) => e.postId === postId);
  if (events.length === 0) return 0;

  const times = events.map((e) => new Date(e.createdAt).getTime());
  const min = Math.min(...times);
  const max = Math.max(...times);
  if (max === min) return events.length;

  const hours = (max - min) / (1000 * 60 * 60);
  return events.length / hours;
}

export function computeTrendScore(post: Post): number {
  const counts = getAggregatedCounts(post.id);

  const laugh = counts.laugh || 0;
  const smile = counts.smile || 0;
  const shock = counts.shock || 0;
  const mindblown = counts.mindblown || 0;
  const angry = counts.angry || 0;
  const crickets = counts.crickets || 0;

  const emotionalHeat =
    laugh * 3 +
    smile * 2 +
    shock * 1.5 +
    mindblown * 4 -
    angry * 2 -
    crickets * 2.5;

  const velocity = computeVelocity(post.id);

  const ageMs = Date.now() - new Date(post.createdAt).getTime();
  const ageHours = ageMs / (1000 * 60 * 60);
  const recencyBoost = Math.max(0.3, 1 - ageHours / 72);

  return emotionalHeat * 0.7 + velocity * 2 * recencyBoost;
}

export function rankTrendingPosts(posts: Post[]): TrendingPost[] {
  return posts
    .map((p) => ({
      ...p,
      trendScore: computeTrendScore(p),
    }))
    .sort((a, b) => b.trendScore - a.trendScore);
}
