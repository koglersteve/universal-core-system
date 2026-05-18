export interface HarmonyState {
  balance: number; // 0–1
  coherence: number; // 0–1
  lastUpdated: number;
}

export const Harmony = {
  default(): HarmonyState {
    return {
      balance: 0.6,
      coherence: 0.6,
      lastUpdated: Date.now()
    };
  },

  fromPillars(
    emotionIntensity: number,
    cognitiveLoad: number,
    behaviorActivation: number
  ): HarmonyState {
    const imbalance = (emotionIntensity + cognitiveLoad + behaviorActivation) / 3;
    const balance = Math.max(0, Math.min(1, 1 - imbalance * 0.7));
    const coherence = Math.max(0, Math.min(1, 0.5 + balance * 0.4));
    return { balance, coherence, lastUpdated: Date.now() };
  }
};
