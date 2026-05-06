// /src/personalization/signals/momentum.ts

import type { ExtractedFeatures } from "../feature-extractor";

export async function computeMomentumSignal(
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  const now = Date.now();

  for (const post of features.posts) {
    const created = new Date(post.createdAt).getTime();
    const ageHours = Math.max(1, (now - created) / (1000 * 60 * 60));

    const engagement = 0; // no favorites/shares/views available
    const velocity = engagement / ageHours;

    const normalized = Math.max(0, Math.min(1, velocity));
    scores[post.id] = normalized;
  }

  return scores;
}
