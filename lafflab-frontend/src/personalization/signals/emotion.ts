import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeEmotionSignal(
  profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  const emotions = (profile as any).recentEmotions ?? [];

  for (const post of features) {
    let score = 0;

    const text = (post as any).text?.toLowerCase?.() ?? "";

    for (const emotion of emotions) {
      if (text.includes(emotion.toLowerCase())) {
        score += 0.5;
      }
    }

    scores[post.id] = Math.min(1, score);
  }

  return scores;
}
