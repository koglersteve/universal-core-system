export interface IntentState {
  goal: string | null;
  strength: number; // 0–1
  direction: string | null;
  lastUpdated: number;
}

export const Intent = {
  default(): IntentState {
    return {
      goal: null,
      strength: 0,
      direction: null,
      lastUpdated: Date.now()
    };
  },

  set(
    state: IntentState,
    goal: string | null,
    direction: string | null,
    strength: number
  ): IntentState {
    return {
      goal,
      direction,
      strength: Math.max(0, Math.min(1, strength)),
      lastUpdated: Date.now()
    };
  },

  decay(state: IntentState, now: number = Date.now()): IntentState {
    const elapsed = (now - state.lastUpdated) / 1000;
    const factor = Math.exp(-elapsed / 120);
    const strength = state.strength * factor;
    return {
      ...state,
      strength,
      goal: strength < 0.1 ? null : state.goal,
      direction: strength < 0.1 ? null : state.direction
    };
  }
};
