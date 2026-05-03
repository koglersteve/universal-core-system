import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeSocialSignal(
  profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    // TODO: boost posts from favoriteAuthors / similar users
    scores[post.id] = 0.5;
  }

  return scores;
}
