// /src/personalization/signals/governance.ts

import type { ExtractedFeatures } from "../feature-extractor";

export async function computeGovernanceSignal(
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    scores[post.id] = 1;
  }

  return scores;
}
