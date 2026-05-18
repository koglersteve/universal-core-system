export interface IntentState {
  goal: string | null;
  direction: string | null;
}

export const Intent = {
  getDefault(): IntentState {
    return {
      goal: null,
      direction: null
    };
  },

  update(state: IntentState, goal: string | null, direction: string | null): IntentState {
    return { goal, direction };
  }
};

