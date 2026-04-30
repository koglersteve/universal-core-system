export const actions = {
  adjustMood: {
    name: "adjustMood",
    run: async (args) => globalThis.mood.adjust(args),
    preconditions: (goal, state) => goal.type === "stabilize_mood",
  },
  updatePersona: {
    name: "updatePersona",
    run: async (args) => globalThis.persona.update(args),
    preconditions: (goal, state) => goal.type === "persona_shift",
  },
};
