export interface WorldState {
  environment: string;
  context: Record<string, any>;
}

export const World = {
  getDefault(): WorldState {
    return {
      environment: "default",
      context: {}
    };
  },

  update(state: WorldState, context: Record<string, any>): WorldState {
    return {
      environment: state.environment,
      context: { ...state.context, ...context }
    };
  }
};
