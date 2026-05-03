import type { ExtractedFeatures } from "../feature-extractor";

export async function computeMomentumSignal(
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    // TODO: use engagement velocity
    scores[post.id] = 0.5;
  }

  return scores;
}
