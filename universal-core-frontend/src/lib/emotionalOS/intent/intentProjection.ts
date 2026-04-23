import { IntentResult, IntentProjection } from "./intentTypes";

export function projectIntent(intent: IntentResult): IntentProjection {
  switch (intent.category) {
    case "chaos":
      return {
        feedBias: "chaos",
        worldBias: "volatile",
        pacing: "fast",
        safetySensitivity: 0.8,
        ritualRecommendation: false,
      };

    case "comfort":
      return {
        feedBias: "comfort",
        worldBias: "stable",
        pacing: "slow",
        safetySensitivity: 1.2,
        ritualRecommendation: true,
      };

    case "distraction":
      return {
        feedBias: "neutral",
        worldBias: "neutral",
        pacing: "normal",
        safetySensitivity: 1.0,
        ritualRecommendation: false,
      };

    case "validation":
      return {
        feedBias: "comfort",
        worldBias: "stable",
        pacing: "normal",
        safetySensitivity: 1.1,
        ritualRecommendation: true,
      };

    case "novelty":
      return {
        feedBias: "chaos",
        worldBias: "volatile",
        pacing: "fast",
        safetySensitivity: 0.9,
        ritualRecommendation: false,
      };

    case "identity":
      return {
        feedBias: "neutral",
        worldBias: "stable",
        pacing: "normal",
        safetySensitivity: 1.0,
        ritualRecommendation: false,
      };

    case "release":
      return {
        feedBias: "comfort",
        worldBias: "stable",
        pacing: "slow",
        safetySensitivity: 1.3,
        ritualRecommendation: true,
      };

    default:
      return {
        feedBias: "neutral",
        worldBias: "neutral",
        pacing: "normal",
        safetySensitivity: 1.0,
        ritualRecommendation: false,
      };
  }
}
