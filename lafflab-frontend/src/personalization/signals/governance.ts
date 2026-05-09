import type { ExtractedFeatures } from "../feature-extractor";

export async function computeGovernanceSignal(
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features) {
    scores[post.id] = 1;
  }

  return scores;
}
