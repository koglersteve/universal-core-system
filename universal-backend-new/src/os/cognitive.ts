export interface CognitiveState {
  clarity: number; // 0–1
  load: number; // 0–1
  lastUpdated: number;
}

export const Cognitive = {
  default(): CognitiveState {
    return { clarity: 0.7, load: 0.3, lastUpdated: Date.now() };
  },

  updateFromEmotion(
    state: CognitiveState,
    emotionIntensity: number,
    now: number = Date.now()
  ): CognitiveState {
    const load = Math.min(1, 0.3 + emotionIntensity * 0.6);
    const clarity = Math.max(0, 1 - load * 0.8);
    return { clarity, load, lastUpdated: now };
  }
};
