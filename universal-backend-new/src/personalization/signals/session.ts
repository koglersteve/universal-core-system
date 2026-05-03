import type { PersonalizationContext } from "../engine";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeSessionSignal(
  ctx: PersonalizationContext,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    // TODO: adapt to current session behavior
    scores[post.id] = 0.5;
  }

  return scores;
}
