export interface AttentionState {
  focus: string | null;
  intensity: number;
  timestamp: number;
}

export const Attention = {
  getDefault(): AttentionState {
    return {
      focus: null,
      intensity: 0,
      timestamp: Date.now()
    };
  },

  update(state: AttentionState, focus: string, intensity: number): AttentionState {
    return {
      focus,
      intensity,
      timestamp: Date.now()
    };
  }
};
