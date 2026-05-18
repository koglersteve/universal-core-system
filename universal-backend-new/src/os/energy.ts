export interface EnergyState {
  level: number; // 0–1
  flow: number; // 0–1
  lastUpdated: number;
}

export const Energy = {
  default(): EnergyState {
    return {
      level: 0.8,
      flow: 0.6,
      lastUpdated: Date.now()
    };
  },

  fromEmotionAndBehavior(
    state: EnergyState,
    emotionIntensity: number,
    behaviorActivation: number
  ): EnergyState {
    const level = Math.max(0, Math.min(1, 0.5 + behaviorActivation * 0.4 - emotionIntensity * 0.2));
    const flow = Math.max(0, Math.min(1, 0.5 + behaviorActivation * 0.3));
    return { level, flow, lastUpdated: Date.now() };
  }
};
