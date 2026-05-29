import type { ResonanceContext, ResonanceResult } from "../crossapp.types";

export type HarmonySnapshot = {
  score: number; // -1 to 1
};

export class Harmony {
  private static score = 0;

  static update(_ctx: ResonanceContext, res: ResonanceResult) {
    const delta =
      res.polarity === "positive"
        ? 0.05
        : res.polarity === "negative"
        ? -0.08
        : -0.01;

    this.score = Math.max(-1, Math.min(1, this.score + delta));
  }

  static snapshot(): HarmonySnapshot {
    return { score: this.score };
  }
}
