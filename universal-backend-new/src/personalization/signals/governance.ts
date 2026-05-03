import type { ExtractedFeatures } from "../feature-extractor";

export async function computeGovernanceSignal(
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    // TODO: apply safety / policy rules
    scores[post.id] = 1.0; // 1 = allowed, 0 = suppressed
  }

  return scores;
}
