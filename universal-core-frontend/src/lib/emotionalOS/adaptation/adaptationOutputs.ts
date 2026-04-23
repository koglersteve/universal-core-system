import { AdaptationMetrics, AdaptationOutputs } from "./adaptationTypes";

export function computeOutputs(m: AdaptationMetrics): AdaptationOutputs {
  const pacing =
    m.volatilityIndex > 0.6
      ? "slow"
      : m.chaosAffinity > 0.5
      ? "fast"
      : "normal";

  const worldVolatilityBias = m.chaosAffinity - m.comfortSeeking;

  const safetySensitivity =
    m.volatilityIndex > 0.5 ? 1.2 : m.chaosAffinity > 0.5 ? 0.8 : 1.0;

  const feedBias =
    m.chaosAffinity > 0.5
      ? "chaos"
      : m.comfortSeeking > 0.5
      ? "comfort"
      : "neutral";

  const ritualRecommendation = m.emotionalSlope < -0.3;

  return {
    pacing,
    worldVolatilityBias,
    safetySensitivity,
    feedBias,
    ritualRecommendation,
  };
}
