export interface AutonomyAction {
  name: string;
  run: (args: any) => Promise<any>;
  preconditions: (goal: any, state: any) => boolean;
  risk?: {
    high?: boolean;
  };
}

export const ActionRegistry: Record<string, AutonomyAction> = {
  adjustMood: {
    name: "adjustMood",
    run: async (args) => globalThis.emotion.adjust(args),
    preconditions: (goal) => goal.type === "stabilize_mood",
  },

  updatePersona: {
    name: "updatePersona",
    run: async (args) => globalThis.persona.update(args),
    preconditions: (goal) => goal.type === "persona_shift",
  },

  storeMemory: {
    name: "storeMemory",
    run: async (args) => globalThis.memory.store(args),
    preconditions: (goal) => goal.type === "memory_commit",
  },

  cognitiveReframe: {
    name: "cognitiveReframe",
    run: async (args) => globalThis.cognitive.reframe(args),
    preconditions: (goal) => goal.type === "cognitive_adjust",
  },

  behaviorNudge: {
    name: "behaviorNudge",
    run: async (args) => globalThis.behavior.nudge(args),
    preconditions: (goal) => goal.type === "behavior_shift",
  },

  kernelHealthCheck: {
    name: "kernelHealthCheck",
    run: async () => globalThis.kernel.health(),
    preconditions: (goal) => goal.type === "system_stability",
  },

  osSync: {
    name: "osSync",
    run: async () => globalThis.os.sync(),
    preconditions: (goal) => goal.type === "os_sync",
  },
};

// Export as a list for filtering
export const listActions = () => Object.values(ActionRegistry);
