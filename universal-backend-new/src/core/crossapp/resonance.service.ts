import type { ResonanceContext, ResonanceResult } from "./crossapp.types.js";
import { getOSState } from "./os/os-engine.js";

export function computeResonance(context: ResonanceContext): ResonanceResult {
  const os = getOSState();

  const base = os.harmony + os.energy + os.tempo;

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
