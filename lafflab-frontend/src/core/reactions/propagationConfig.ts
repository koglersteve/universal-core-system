// lafflab-frontend/src/core/reactions/propagationConfig.ts

import { getAggregatedCounts } from "@/core/reactions/reactionStore";

/**
 * Returns propagation weights for each emoji, adjusted by post heat.
 */
export function getPropagationConfig(postId?: string) {
  const base = {
    hysterical: 1.6,
    laughing: 1.3,
    expressionless: 0.4,
    shock: 1.2,
    mindblown: 1.5,
    angry: 0.9,
    crickets: 0.2,
  };

  const postCounts = postId ? getAggregatedCounts(postId) : null;

  const postHeat = postCounts
    ? Object.values(postCounts).reduce(
        (a: number, b: number) => a + b,
        0
      )
    : 0;

  const postHeatFactor = Math.min(1.5, 1 + postHeat / 50);

  return {
    hysterical: base.hysterical * postHeatFactor,
    laughing: base.laughing * postHeatFactor,
    expressionless: base.expressionless * postHeatFactor,
    shock: base.shock * postHeatFactor,
    mindblown: base.mindblown * postHeatFactor,
    angry: base.angry * postHeatFactor,
    crickets: base.crickets * postHeatFactor,
  };
}

/**
 * Engine expects an ARRAY of actions.
 */
export function getPropagationActionsForEmoji(
  emoji: string,
  postId?: string
) {
  const config = getPropagationConfig(postId);

  switch (emoji) {
    case "hysterical":
      return [{ weight: config.hysterical, type: "positive" }];

    case "laughing":
      return [{ weight: config.laughing, type: "positive" }];

    case "expressionless":
      return [{ weight: config.expressionless, type: "neutral" }];

    case "shock":
      return [{ weight: config.shock, type: "intense" }];

    case "mindblown":
      return [{ weight: config.mindblown, type: "intense" }];

    case "angry":
      return [{ weight: config.angry, type: "negative" }];

    case "crickets":
      return [{ weight: config.crickets, type: "dead" }];

    default:
      return [{ weight: 1, type: "neutral" }];
  }
}
