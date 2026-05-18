export type EmotionLabel =
  | "neutral"
  | "joy"
  | "calm"
  | "sad"
  | "angry"
  | "anxious"
  | "excited";

export interface EmotionState {
  label: EmotionLabel;
  intensity: number; // 0–1
  lastUpdated: number;
}

export const Emotion = {
  default(): EmotionState {
    return { label: "neutral", intensity: 0, lastUpdated: Date.now() };
  },

  decay(state: EmotionState, now: number = Date.now()): EmotionState {
    const elapsed = (now - state.lastUpdated) / 1000;
    const factor = Math.exp(-elapsed / 60);
    return {
      ...state,
      intensity: Math.max(0, state.intensity * factor),
      lastUpdated: now
    };
  },

  applyDelta(
    state: EmotionState,
    label: EmotionLabel,
    delta: number,
    now: number = Date.now()
  ): EmotionState {
    const decayed = this.decay(state, now);
    const sameLabel = decayed.label === label;
    const baseIntensity = sameLabel ? decayed.intensity : decayed.intensity * 0.4;
    const nextIntensity = Math.max(0, Math.min(1, baseIntensity + delta));

    return {
      label: nextIntensity === 0 ? "neutral" : label,
      intensity: nextIntensity,
      lastUpdated: now
    };
  }
};
