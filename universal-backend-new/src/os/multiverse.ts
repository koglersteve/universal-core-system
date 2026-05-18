import { OSState, OSStateManager } from "./state";

export interface UniverseInstance {
  id: string;
  label: string;
  createdAt: number;
  state: OSState;
}

const universes = new Map<string, UniverseInstance>();

function createId() {
  return `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const Multiverse = {
  ensureDefault(): UniverseInstance {
    let existing = universes.get("default");
    if (!existing) {
      existing = {
        id: "default",
        label: "Default Universe",
        createdAt: Date.now(),
        state: OSStateManager.create()
      };
      universes.set("default", existing);
    }
    return existing;
  },

  create(label: string): UniverseInstance {
    const id = createId();
    const instance: UniverseInstance = {
      id,
      label,
      createdAt: Date.now(),
      state: OSStateManager.create()
    };
    universes.set(id, instance);
    return instance;
  },

  list(): UniverseInstance[] {
    this.ensureDefault();
    return Array.from(universes.values());
  },

  get(id: string): UniverseInstance | null {
    if (id === "default") return this.ensureDefault();
    return universes.get(id) || null;
  }
};
