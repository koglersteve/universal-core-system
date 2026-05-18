export interface EthicsState {
  alignment: string;
  integrity: number;
}

export const Ethics = {
  getDefault(): EthicsState {
    return {
      alignment: "neutral",
      integrity: 1.0
    };
  },

  update(state: EthicsState, alignment: string, integrity: number): EthicsState {
    return { alignment, integrity };
  }
};
