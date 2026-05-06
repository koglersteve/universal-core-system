// /src/personalization/signals/social.ts

import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeSocialSignal(
  _profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    scores[post.id] = 0;
  }

  return scores;
}
