export interface UniverseState {
  id: string;
  createdAt: number;
  parent: string | null;
  state: Record<string, any>;
}

export const Multiverse = {
  create(): UniverseState {
    return {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      parent: null,
      state: {}
    };
  },

  list(defaultUniverse: UniverseState[]): UniverseState[] {
    return defaultUniverse;
  }
};
