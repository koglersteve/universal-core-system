export interface TempoState {
  speed: number; // 0–1
  rhythm: number; // 0–1
  lastUpdated: number;
}

export const Tempo = {
  default(): TempoState {
    return {
      speed: 0.8,
      rhythm: 0.8,
      lastUpdated: Date.now()
    };
  },

  fromBehavior(activation: number): TempoState {
    const speed = Math.max(0, Math.min(1, 0.5 + activation * 0.4));
    const rhythm = Math.max(0, Math.min(1, 0.5 + activation * 0.3));
    return { speed, rhythm, lastUpdated: Date.now() };
  }
};
