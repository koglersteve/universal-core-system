import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeRelevanceSignal(
  profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  const interests = (profile as any).interests ?? [];

  for (const post of features) {
    let score = 0;

    const text = (post as any).text?.toLowerCase?.() ?? "";

    for (const interest of interests) {
      if (text.includes(interest.toLowerCase())) {
        score += 0.3;
      }
    }

    scores[post.id] = Math.min(1, score);
  }

  return scores;
}
