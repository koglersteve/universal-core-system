import type { EmotionalOSSnapshot } from "./os-engine.js";

export type WorldSnapshot = {
  mood: "uplifting" | "neutral" | "heavy";
  notes: string[];
};

export class World {
  static derive(os: EmotionalOSSnapshot): WorldSnapshot {
    const { harmony, tempo } = os;

    if (harmony.score > 0.3 && tempo.band !== "slow") {
      return {
        mood: "uplifting",
        notes: [
          "global mood is positive and active",
          "safe to surface inspiring content",
        ],
      };
    }

    if (harmony.score < -0.2) {
      return {
        mood: "heavy",
        notes: [
          "global mood is strained",
          "prefer supportive and grounding experiences",
        ],
      };
    }

    return {
      mood: "neutral",
      notes: [
        "global mood is balanced",
        "flexible to either calm or energetic flows",
      ],
    };
  }
}
