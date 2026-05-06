// /src/personalization/signals/relevance.ts

import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeRelevanceSignal(
  profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    let score = 0;

    const text = (post.text ?? "").toLowerCase();

    for (const interest of profile.interests) {
      const i = interest.toLowerCase();
      if (text.includes(i)) score += 0.3;
    }

    scores[post.id] = Math.min(1, score);
  }

  return scores;
}
