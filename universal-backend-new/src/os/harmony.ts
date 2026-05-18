export interface HarmonyState {
  balance: number;
  coherence: number;
}

export const Harmony = {
  getDefault(): HarmonyState {
    return {
      balance: 0.5,
      coherence: 0.5
    };
  },

  update(state: HarmonyState, balance: number, coherence: number): HarmonyState {
    return { balance, coherence };
  }
};
