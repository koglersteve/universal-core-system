import type { EmotionalOSSnapshot } from "./os-engine.js";

export type BehaviorSnapshot = {
  mode: "explore" | "stabilize" | "de-escalate";
  notes: string[];
};

export class Behavior {
  static derive(os: EmotionalOSSnapshot): BehaviorSnapshot {
    const { state, harmony, tempo, intent } = os;

    if (state.mode === "tense" || harmony.score < -0.2) {
      return {
        mode: "de-escalate",
        notes: [
          "reduce intensity",
          "avoid provocative content",
          "prioritize safety and calm",
        ],
      };
    }

    if (state.mode === "excited" || tempo.band === "fast") {
      return {
        mode: "explore",
        notes: [
          "surface novel content",
          "lean into current interests",
          `respect intent: ${intent.inferredIntent ?? "unknown"}`,
        ],
      };
    }

    return {
      mode: "stabilize",
      notes: [
        "maintain balance",
        "avoid sharp emotional swings",
        "keep experience predictable",
      ],
    };
  }
}
