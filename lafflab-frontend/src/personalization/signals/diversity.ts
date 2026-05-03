// /src/personalization/signals/diversity.ts
import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeDiversitySignal(
  profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    // simple: small random jitter to avoid strict ranking ties
    scores[post.id] = Math.random() * 0.2;
  }

  return scores;
}
