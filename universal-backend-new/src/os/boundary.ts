export interface BoundaryState {
  openness: number; // 0–1
  protection: number; // 0–1
  lastUpdated: number;
}

export const Boundary = {
  default(): BoundaryState {
    return {
      openness: 0.5,
      protection: 0.5,
      lastUpdated: Date.now()
    };
  },

  adjust(state: BoundaryState, deltaOpenness: number, deltaProtection: number): BoundaryState {
    const openness = Math.max(0, Math.min(1, state.openness + deltaOpenness));
    const protection = Math.max(0, Math.min(1, state.protection + deltaProtection));
    return { openness, protection, lastUpdated: Date.now() };
  }
};
