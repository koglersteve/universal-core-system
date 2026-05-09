import type { ExtractedFeatures } from "../feature-extractor";

export async function computeMomentumSignal(
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  const now = Date.now();

  for (const post of features) {
    const created = new Date(post.createdAt).getTime();
    const ageHours = Math.max(1, (now - created) / (1000 * 60 * 60));

    const engagement = 0;
    const velocity = engagement / ageHours;

    scores[post.id] = Math.max(0, Math.min(1, velocity));
  }

  return scores;
}
