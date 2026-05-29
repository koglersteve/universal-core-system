import type { EmotionalOSSnapshot } from "./os-engine.js";
import type { BoundarySnapshot } from "./boundary.js";
import { Boundary } from "./boundary.js";

export type EthicsSnapshot = {
  risk: "low" | "medium" | "high";
  notes: string[];
};

export class Ethics {
  static derive(os: EmotionalOSSnapshot): EthicsSnapshot {
    const boundary: BoundarySnapshot = Boundary.derive(os);
    const { harmony } = os;

    if (boundary.strictness === "high" || harmony.score < -0.3) {
      return {
        risk: "high",
        notes: [
          "enforce strict ethical safeguards",
          "avoid sensitive or polarizing content",
        ],
      };
    }

    if (boundary.strictness === "low" && harmony.score > 0.4) {
      return {
        risk: "low",
        notes: [
          "standard ethical safeguards sufficient",
          "monitor but allow exploration",
        ],
      };
    }

    return {
      risk: "medium",
      notes: [
        "maintain normal ethical checks",
        "watch for shifts in harmony or boundaries",
      ],
    };
  }
}
