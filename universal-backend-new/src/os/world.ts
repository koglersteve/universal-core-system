export interface WorldState {
  environment: string;
  context: Record<string, any>;
  lastUpdated: number;
}

export const World = {
  default(): WorldState {
    return {
      environment: "default",
      context: {},
      lastUpdated: Date.now()
    };
  },

  updateContext(state: WorldState, patch: Record<string, any>): WorldState {
    return {
      environment: state.environment,
      context: { ...state.context, ...patch },
      lastUpdated: Date.now()
    };
  }
};
