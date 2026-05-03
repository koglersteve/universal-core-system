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

    const favorites = post.favorites ?? 0;
    const shares = post.shares ?? 0;
    const views = post.views ?? 1;

    const engagement = (favorites * 2 + shares * 3) / views;
    const velocity = engagement / ageHours;

    const normalized = Math.max(0, Math.min(1, velocity * 10));
    scores[post.id] = normalized;
  }

  return scores;
}
