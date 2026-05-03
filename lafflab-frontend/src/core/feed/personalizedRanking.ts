import type { Post } from "@/types/jokes";
import { getAggregatedCounts } from "@/core/reactions/engine";
import { getUserProfile } from "@/core/reactions/userProfile";

export type RankedPost = Post & { score: number };

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/**
 * Compute a personalized score for a post for a given user.
 * Uses:
 * - global reaction counts
 * - emoji semantics
 * - user emoji affinity
 * - time decay
 */
export function scorePostForUser(post: Post, userId: string): number {
  const counts = getAggregatedCounts(post.id);
  const profile = getUserProfile(userId);

  const laugh = counts.laugh || 0;
  const smile = counts.smile || 0;
  const shock = counts.shock || 0;
  const mindblown = counts.mindblown || 0;
  const angry = counts.angry || 0;
  const crickets = counts.crickets || 0;
  const expressionless = counts.expressionless || 0;

  const positive =
    laugh * 3 +
    smile * 2 +
    shock * 1.5 +
    mindblown * 4;

  const negative =
    angry * 2 +
    crickets * 2.5 +
    expressionless * 0.8;

  let baseScore = positive - negative;

  // Time decay (newer posts get a boost)
  const ageMs = Date.now() - new Date(post.createdAt).getTime();
  const ageHours = ageMs / (1000 * 60 * 60);
  const decay = Math.max(0.2, 1 - ageHours / 48); // decays over 2 days
  baseScore *= decay;

  if (!profile || profile.totalReactions === 0) {
    return baseScore;
  }

  // User affinity: how much this post's emoji mix matches the user's history
  const totalUser = profile.totalReactions;
  const userLaugh = profile.emojiCounts.laugh / totalUser;
  const userSmile = profile.emojiCounts.smile / totalUser;
  const userShock = profile.emojiCounts.shock / totalUser;
  const userMindblown = profile.emojiCounts.mindblown / totalUser;
  const userCrickets = profile.emojiCounts.crickets / totalUser;
  const userAngry = profile.emojiCounts.angry / totalUser;

  const postTotal =
    laugh +
    smile +
    shock +
    mindblown +
    crickets +
    angry +
    expressionless;

  const postLaugh = postTotal ? laugh / postTotal : 0;
  const postSmile = postTotal ? smile / postTotal : 0;
  const postShock = postTotal ? shock / postTotal : 0;
  const postMindblown = postTotal ? mindblown / postTotal : 0;
  const postCrickets = postTotal ? crickets / postTotal : 0;
  const postAngry = postTotal ? angry / postTotal : 0;

  const affinity =
    postLaugh * userLaugh +
    postSmile * userSmile +
    postShock * userShock +
    postMindblown * userMindblown -
    postCrickets * userCrickets -
    postAngry * userAngry;

  const affinityBoost = sigmoid(affinity * 4) - 0.5;

  return baseScore + affinityBoost * 10;
}

/**
 * Rank posts for a given user using personalized scoring.
 */
export function rankPostsForUser(posts: Post[], userId: string): RankedPost[] {
  return posts
    .map((p) => ({
      ...p,
      score: scorePostForUser(p, userId),
    }))
    .sort((a, b) => b.score - a.score);
}
