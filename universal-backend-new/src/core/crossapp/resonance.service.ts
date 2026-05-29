// src/core/crossapp/resonance.service.ts
import type { ResonanceContext, ResonanceResult } from "./crossapp.types.js";
import { getOSState } from "./os/os-engine.js";

export function computeResonance(context: ResonanceContext): ResonanceResult {
  const os = getOSState(context.userId);

  // Force numeric values
  const base =
    Number(os.core.harmony.score) +
    Number(os.energy.level) +
    Number(os.core.tempo.bpm);

  const score = Math.max(1, Math.floor(base / 3));

  const magnitude =
    score > 7 ? "high" :
    score > 3 ? "medium" :
    "low";

  const polarity =
    context.signalType === "reaction" && context.emoji === "angry"
      ? "negative"
      : "positive";

  return {
    score,
    magnitude,
    polarity,
    tags: ["emotional", "crossapp"],
    createdAt: new Date().toISOString()
  };
}
