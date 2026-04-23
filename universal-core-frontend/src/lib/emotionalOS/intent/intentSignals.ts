import { IntentSignal } from "./intentTypes";

export function buildIntentSignal(partial: Partial<IntentSignal>): IntentSignal {
  return {
    chaosAffinity: partial.chaosAffinity ?? 0,
    comfortSeeking: partial.comfortSeeking ?? 0,
    volatility: partial.volatility ?? 0,
    emotionalSlope: partial.emotionalSlope ?? 0,
    worldStability: partial.worldStability ?? 1,
    reactionSignature: partial.reactionSignature ?? "neutral",
    continuityArcs: partial.continuityArcs ?? [],
    adaptationOutputs: partial.adaptationOutputs ?? {},
  };
}
