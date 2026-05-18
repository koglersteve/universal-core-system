export interface SignalState {
  tone: string;
  intensity: number;
}

export const Signal = {
  getDefault(): SignalState {
    return {
      tone: "soft",
      intensity: 0
    };
  },

  update(state: SignalState, tone: string, intensity: number): SignalState {
    return { tone, intensity };
  }
};
