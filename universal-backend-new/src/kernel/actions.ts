export const actions = {
  adjustMood: {
    name: "adjustMood",
    run: async (args: any) => globalThis.emotion.adjust(args),
    preconditions: (goal: any, state: any) => goal.type === "stabilize_mood",
  },

  updatePersona: {
    name: "updatePersona",
    run: async (args: any) => globalThis.persona.update(args),
    preconditions: (goal: any, state: any) => goal.type === "persona_shift",
  },
};
