// src/personalization/signals/session.ts

import type { ExtractedFeatures } from "../feature-extractor";

export async function computeSessionSignal(
  _ctx: unknown,
  _features: ExtractedFeatures
): Promise<number> {
  return 0;
}
