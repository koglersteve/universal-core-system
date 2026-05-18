export interface TempoState {
  speed: number;
  rhythm: number;
}

export const Tempo = {
  getDefault(): TempoState {
    return {
      speed: 1.0,
      rhythm: 1.0
    };
  },

  update(state: TempoState, speed: number, rhythm: number): TempoState {
    return { speed, rhythm };
  }
};
