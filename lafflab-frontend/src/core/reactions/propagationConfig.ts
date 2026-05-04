// lafflab-frontend/src/core/reactions/propagationConfig.ts

import { getAggregatedCounts } from "@/core/reactions/reactionStore";

/**
 * Returns propagation weights for each emoji, adjusted by post heat.
 */
export function getPropagationConfig(postId?: string) {
  const base = {
    laugh: 1.0,
    smile: 0.8,
    shock: 1.2,
    mindblown: 1.4,
  };

  const postCounts = postId ? getAggregatedCounts(postId) : null;

  // Strict‑safe reducer
  const postHeat = postCounts
    ? Object.values(postCounts).reduce(
        (a: number, b: number) => a + b,
        0
      )
    : 0;

  const postHeatFactor = Math.min(1.5, 1 + postHeat / 50);

  return {
    laugh: base.laugh * postHeatFactor,
    smile: base.smile * postHeatFactor,
    shock: base.shock * postHeatFactor,
    mindblown: base.mindblown * postHeatFactor,
  };
}

/**
 * Engine expects this function.
 * Returns the propagation actions for a given emoji.
 */
export function getPropagationActionsForEmoji(emoji: string, postId?: string) {
  const config = getPropagationConfig(postId);

  switch (emoji) {
    case "laugh":
      return { weight: config.laugh, type: "positive" };
    case "smile":
      return { weight: config.smile, type: "positive" };
    case "shock":
      return { weight: config.shock, type: "intense" };
    case "mindblown":
      return { weight: config.mindblown, type: "intense" };
    default:
      return { weight: 1, type: "neutral" };
  }
}
