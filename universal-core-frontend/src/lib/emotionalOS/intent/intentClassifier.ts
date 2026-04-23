import { IntentSignal, IntentResult } from "./intentTypes";

export function classifyIntent(s: IntentSignal): IntentResult {
  // Chaos-seeking
  if (s.chaosAffinity > 0.6 && s.volatility > 0.5) {
    return { category: "chaos", confidence: 0.9 };
  }

  // Comfort-seeking
  if (s.comfortSeeking > 0.6 && s.emotionalSlope < -0.2) {
    return { category: "comfort", confidence: 0.85 };
  }

  // Distraction
  if (s.volatility < 0.3 && s.reactionSignature === "neutral") {
    return { category: "distraction", confidence: 0.7 };
  }

  // Validation-seeking
  if (s.reactionSignature === "smile" && s.emotionalSlope < 0) {
    return { category: "validation", confidence: 0.75 };
  }

  // Novelty-seeking
  if (s.worldStability < 0.5 && s.volatility < 0.4) {
    return { category: "novelty", confidence: 0.8 };
  }

  // Identity reinforcement
  if (s.continuityArcs.some(a => a.dominantMood === "high")) {
    return { category: "identity", confidence: 0.7 };
  }

  // Emotional release
  if (s.emotionalSlope < -0.4) {
    return { category: "release", confidence: 0.8 };
  }

  // Exploration (default)
  return { category: "exploration", confidence: 0.5 };
}
