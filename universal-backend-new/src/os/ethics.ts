export interface EthicsState {
  alignment: "neutral" | "supportive" | "protective";
  integrity: number; // 0–1
  lastUpdated: number;
}

export const Ethics = {
  default(): EthicsState {
    return {
      alignment: "supportive",
      integrity: 1.0,
      lastUpdated: Date.now()
    };
  },

  nudge(state: EthicsState, deltaIntegrity: number): EthicsState {
    const integrity = Math.max(0, Math.min(1, state.integrity + deltaIntegrity));
    return {
      alignment: integrity < 0.4 ? "protective" : "supportive",
      integrity,
      lastUpdated: Date.now()
    };
  }
};
