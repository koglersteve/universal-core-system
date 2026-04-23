import { ContinuitySignal } from "./continuityTypes";

export function buildContinuitySignal(partial: Partial<ContinuitySignal>): ContinuitySignal {
  return {
    mood: partial.mood ?? 50,
    tension: partial.tension ?? 0,
    worldName: partial.worldName ?? "default",
    reactionSignature: partial.reactionSignature ?? "neutral",
    volatility: partial.volatility ?? 0,
  };
}
