import type { EmotionalOSSnapshot } from "./os-engine";

export type BoundarySnapshot = {
  strictness: "low" | "medium" | "high";
  notes: string[];
};

export class Boundary {
  static derive(os: EmotionalOSSnapshot): BoundarySnapshot {
    const { harmony, state } = os;

    if (harmony.score < -0.3 || state.mode === "tense") {
      return {
        strictness: "high",
        notes: [
          "limit exposure to intense content",
          "tighten safety filters",
          "reduce controversial surfaces",
        ],
      };
    }

    if (harmony.score > 0.4 && state.mode === "excited") {
      return {
        strictness: "low",
        notes: [
          "allow more exploration",
          "relax non-critical constraints",
          "encourage discovery",
        ],
      };
    }

    return {
      strictness: "medium",
      notes: [
        "maintain standard safeguards",
        "allow moderate exploration",
        "monitor for emotional drift",
      ],
    };
  }
}
