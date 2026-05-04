// lafflab-frontend/src/core/reactions/propagationConfig.ts

import { getAggregatedCounts } from "./reactionStore";

export function getPropagationConfig(postId?: string) {
  // Base propagation weights
  const base = {
    laugh: 1.0,
    smile: 0.8,
    shock: 1.2,
    mindblown: 1.4,
  };

  // Get aggregated counts for this post
  const postCounts = postId ? getAggregatedCounts(postId) : null;

  // Strict‑safe reducer: explicitly type accumulator as number
  const postHeat = postCounts
    ? Object.values(postCounts).reduce((a: number, b: number) => a + b, 0)
    : 0;

  const postHeatFactor = Math.min(1.5, 1 + postHeat / 50);

  return {
    laugh: base.laugh * postHeatFactor,
    smile: base.smile * postHeatFactor,
    shock: base.shock * postHeatFactor,
    mindblown: base.mindblown * postHeatFactor,
  };
}
