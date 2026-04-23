import { AdaptationSignal } from "./adaptationTypes";

export function buildAdaptationSignals({
  mood,
  tension,
  identityDrift,
  worldSwitchCount,
  volatility,
  reactions,
  viewHistory,
  ritualsCompleted,
  safetyEvents,
}: Partial<AdaptationSignal>): AdaptationSignal {
  return {
    mood: mood ?? 50,
    tension: tension ?? 0,
    identityDrift: identityDrift ?? 0,
    worldSwitchCount: worldSwitchCount ?? 0,
    volatility: volatility ?? 0,

    reactions: reactions ?? {
      laugh: 0,
      smile: 0,
      shock: 0,
      sad: 0,
      angry: 0,
      mindblown: 0,
      chaos: 0,
    },

    viewHistory: viewHistory ?? [],
    ritualsCompleted: ritualsCompleted ?? 0,
    safetyEvents: safetyEvents ?? [],
  };
}
