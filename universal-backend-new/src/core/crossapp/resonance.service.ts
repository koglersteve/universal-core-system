import type { ResonanceContext, ResonanceResult } from "./crossapp.types.js";
import { getOSState } from "./os/os-engine.js";

export function computeResonance(context: ResonanceContext): ResonanceResult {
  // Use the userId to get a personalized OS view
  const os = getOSState(context.userId);

  // harmony and tempo come from core, energy comes from the derived view
  const base =
    os.core.harmony.score +
    os.energy.level +
    os.core.tempo.bpm;

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
    createdAt: new Date().toISOString(),
  };
}
