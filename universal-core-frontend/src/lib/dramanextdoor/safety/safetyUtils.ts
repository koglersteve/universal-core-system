import { SafetySignal } from "./safetyTypes";

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function computeMoodVolatility(history: any[]): number {
  if (!history || history.length < 2) return 0;

  const [last, prev] = history;
  const diff = Math.abs((last.mood ?? 0) - (prev.mood ?? 0));

  // Normalize to 0–1 assuming max meaningful delta of 100
  return clamp(diff / 100, 0, 1);
}

export function computeCanonicalStability(history: any[], currentMood: number): number {
  if (!history || history.length === 0) return 1;

  const last = history[0];
  const diff = Math.abs((last.mood ?? 0) - currentMood);

  // Higher diff → lower stability
  const stability = 1 - clamp(diff / 100, 0, 1);
  return stability;
}

export function isHighTension(tension: number, threshold = 0.7): boolean {
  return tension >= threshold;
}

export function isLowMood(mood: number, threshold = 25): boolean {
  return mood <= threshold;
}

export function isHighIdentityDrift(drift: number, threshold = 0.7): boolean {
  return drift >= threshold;
}

export function isFrequentWorldSwitching(count: number, threshold = 4): boolean {
  return count >= threshold;
}

export function summarizeSignals(signals: SafetySignal) {
  return {
    mood: signals.mood,
    tension: signals.tension,
    identityDrift: signals.identityDrift,
    worldSwitchCount: signals.worldSwitchCount,
    volatility: computeMoodVolatility(signals.canonicalHistory),
    canonicalStability: computeCanonicalStability(
      signals.canonicalHistory,
      signals.mood
    ),
  };
}
