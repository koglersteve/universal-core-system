import type { Post } from "@/types/jokes";
import { getAggregatedCounts } from "@/core/reactions/engine";
import { getUserProfile } from "@/core/reactions/userProfile";

export function scorePostForUser(post: Post, userId: string): number {
  const counts = getAggregatedCounts(post.id);
  const profile = getUserProfile(userId);

  const laugh = counts.laugh || 0;
  const smile = counts.smile || 0;
  const mindblown = counts.mindblown || 0;
  const crickets = counts.crickets || 0;

  const baseScore =
    laugh * 3 +
    smile * 2 +
    mindblown * 4 -
    (counts.expressionless || 0) * 0.5 -
    (counts.angry || 0) * 1.5 -
    crickets * 2;

  if (!profile) return baseScore;

  const affinity =
    laugh * profile.emojiCounts.laugh +
    smile * profile.emojiCounts.smile +
    mindblown * profile.emojiCounts.mindblown -
    crickets * profile.emojiCounts.crickets;

  return baseScore + affinity * 0.5;
}
