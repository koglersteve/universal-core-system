// /src/personalization/signals/emotion.ts
import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeEmotionSignal(
  profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    const tags = (post.tags ?? []).map((t) => t.toLowerCase());
    let score = 0;

    for (const emotion of profile.recentEmotions) {
      if (tags.includes(emotion.toLowerCase())) {
        score += 0.5;
      }
    }

    scores[post.id] = Math.min(1, score);
  }

  return scores;
}
