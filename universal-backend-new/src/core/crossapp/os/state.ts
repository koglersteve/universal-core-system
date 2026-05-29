import type { HarmonySnapshot } from "./harmony.js";
import type { ResonanceResult } from "../crossapp.types.js";

export type OSMode = "calm" | "excited" | "tense";

export type StateSnapshot = {
  mode: OSMode;
};

export class OSState {
  private static mode: OSMode = "calm";

  static update(harmony: HarmonySnapshot, lastResonance: ResonanceResult) {
    if (harmony.score > 0.4 && lastResonance.magnitude === "high") {
      this.mode = "excited";
    } else if (harmony.score < -0.2) {
      this.mode = "tense";
    } else {
      this.mode = "calm";
    }
  }

  static snapshot(): StateSnapshot {
    return { mode: this.mode };
  }
}
