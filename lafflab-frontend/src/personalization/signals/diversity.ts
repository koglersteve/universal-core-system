// /src/personalization/signals/diversity.ts

import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeDiversitySignal(
  _profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    scores[post.id] = Math.random() * 0.2;
  }

  return scores;
}
