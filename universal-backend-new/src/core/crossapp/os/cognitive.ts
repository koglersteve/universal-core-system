import type { EmotionalOSSnapshot } from "./os-engine.js";

export type CognitiveSnapshot = {
  load: "low" | "medium" | "high";
  notes: string[];
};

export class Cognitive {
  static derive(os: EmotionalOSSnapshot): CognitiveSnapshot {
    const recentEvents = os.memory.recent.length;
    const tempo = os.tempo.bpm;

    const score = recentEvents + tempo;

    if (score >= 40) {
      return {
        load: "high",
        notes: [
          "user is processing a lot",
          "avoid complex decisions",
          "prefer clarity and summaries",
        ],
      };
    }

    if (score >= 15) {
      return {
        load: "medium",
        notes: [
          "user can handle moderate complexity",
          "mix detail with guidance",
        ],
      };
    }

    return {
      load: "low",
      notes: [
        "user is in a low-load state",
        "safe to introduce new concepts gently",
      ],
    };
  }
}
