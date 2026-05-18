export interface EnergyState {
  level: number;
  flow: number;
}

export const Energy = {
  getDefault(): EnergyState {
    return {
      level: 1.0,
      flow: 0.5
    };
  },

  update(state: EnergyState, level: number, flow: number): EnergyState {
    return { level, flow };
  }
};
