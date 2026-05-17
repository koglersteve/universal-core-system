export const actions = {
  adjustMood: {
    name: "adjustMood",
    run: async (args: any) => {
      return await globalThis.emotion?.adjust?.(args);
    },
    preconditions: (goal: any) => goal.type === "stabilize_mood",
  },

  updatePersona: {
    name: "updatePersona",
    run: async (args: any) => {
      return await globalThis.persona?.update?.(args);
    },
    preconditions: (goal: any) => goal.type === "persona_shift",
  },
};
