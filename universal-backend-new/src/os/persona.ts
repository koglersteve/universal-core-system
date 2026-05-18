export interface PersonaState {
  persona: string;
}

export const Persona = {
  getDefault(): PersonaState {
    return { persona: "neutral-guide" };
  },

  update(state: PersonaState, persona: string): PersonaState {
    return { persona };
  }
};
