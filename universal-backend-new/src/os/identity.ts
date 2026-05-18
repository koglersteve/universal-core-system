export interface IdentityState {
  id: string;
  traits: Record<string, number>;
  lastUpdated: number;
}

export const Identity = {
  default(): IdentityState {
    return {
      id: "emotional-os",
      traits: {},
      lastUpdated: Date.now()
    };
  },

  reinforceTrait(
    state: IdentityState,
    trait: string,
    delta: number,
    now: number = Date.now()
  ): IdentityState {
    const current = state.traits[trait] ?? 0.5;
    const next = Math.max(0, Math.min(1, current + delta));
    return {
      ...state,
      traits: { ...state.traits, [trait]: next },
      lastUpdated: now
    };
  }
};
