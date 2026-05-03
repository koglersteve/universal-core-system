// /src/personalization/signals/governance.ts
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeGovernanceSignal(
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    // TODO: plug in safety filters; for now all allowed
    scores[post.id] = 1;
  }

  return scores;
}
