// /src/personalization/signals/session.ts
import type { PersonalizationContext } from "../engine";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeSessionSignal(
  ctx: PersonalizationContext,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    // placeholder: neutral session weight
    scores[post.id] = 0.5;
  }

  return scores;
}
