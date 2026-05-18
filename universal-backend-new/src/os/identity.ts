export interface IdentityState {
  id: string;
  traits: Record<string, any>;
}

export const Identity = {
  getDefault(): IdentityState {
    return {
      id: "anonymous",
      traits: {}
    };
  },

  update(state: IdentityState, traits: Record<string, any>): IdentityState {
    return {
      id: state.id,
      traits: { ...state.traits, ...traits }
    };
  }
};
