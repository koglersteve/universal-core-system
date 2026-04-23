import { AdaptationSignal, AdaptationMetrics } from "./adaptationTypes";

export function computeMetrics(s: AdaptationSignal): AdaptationMetrics {
  const emotionalSlope = (s.mood - 50) / 50; // normalized
  const chaosAffinity = (s.reactions["chaos"] ?? 0) / 10;
  const comfortSeeking = (s.reactions["smile"] + s.reactions["sad"]) / 10;
  const worldStability = 1 - Math.min(s.worldSwitchCount / 10, 1);
  const volatilityIndex = s.volatility;

  const reactionSignature =
    chaosAffinity > 0.5
      ? "chaos"
      : comfortSeeking > 0.5
      ? "comfort"
      : "neutral";

  return {
    emotionalSlope,
    chaosAffinity,
    comfortSeeking,
    worldStability,
    reactionSignature,
    volatilityIndex,
  };
}
