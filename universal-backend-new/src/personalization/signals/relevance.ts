import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeRelevanceSignal(
  profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    // TODO: real semantic / keyword relevance
    scores[post.id] = 0.5;
  }

  return scores;
}
