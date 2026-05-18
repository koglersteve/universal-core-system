export interface BoundaryState {
  openness: number;
  protection: number;
}

export const Boundary = {
  getDefault(): BoundaryState {
    return {
      openness: 0.5,
      protection: 0.5
    };
  },

  update(state: BoundaryState, openness: number, protection: number): BoundaryState {
    return { openness, protection };
  }
};
