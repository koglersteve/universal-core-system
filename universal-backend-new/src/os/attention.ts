export interface AttentionState {
  focus: string | null;
  intensity: number; // 0–1
  lastUpdated: number;
}

export const Attention = {
  default(): AttentionState {
    return {
      focus: null,
      intensity: 0,
      lastUpdated: Date.now()
    };
  },

  shift(state: AttentionState, focus: string | null, delta: number): AttentionState {
    const nextIntensity = Math.max(0, Math.min(1, state.intensity + delta));
    return {
      focus,
      intensity: focus ? nextIntensity : 0,
      lastUpdated: Date.now()
    };
  },

  fromEmotionAndCognition(
    state: AttentionState,
    emotionIntensity: number,
    cognitiveLoad: number
  ): AttentionState {
    const base = Math.max(emotionIntensity, cognitiveLoad);
    const intensity = Math.max(0, Math.min(1, base));
    return {
      focus: state.focus,
      intensity,
      lastUpdated: Date.now()
    };
  }
};
