export const ActionRegistry = {
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

  storeMemory: {
    name: "storeMemory",
    run: async (args: any) => {
      return await globalThis.memory?.store?.(args);
    },
    preconditions: (goal: any) => goal.type === "memory_commit",
  },

  cognitiveReframe: {
    name: "cognitiveReframe",
    run: async (args: any) => {
      return await globalThis.cognitive?.reframe?.(args);
    },
    preconditions: (goal: any) => goal.type === "cognitive_adjust",
  },

  behaviorNudge: {
    name: "behaviorNudge",
    run: async (args: any) => {
      return await globalThis.behavior?.nudge?.(args);
    },
    preconditions: (goal: any) => goal.type === "behavior_shift",
  },

  kernelHealthCheck: {
    name: "kernelHealthCheck",
    run: async () => {
      return await globalThis.kernel?.health?.();
    },
    preconditions: (goal: any) => goal.type === "system_stability",
  },

  osSync: {
    name: "osSync",
    run: async () => {
      return await globalThis.os?.sync?.();
    },
    preconditions: (goal: any) => goal.type === "os_sync",
  },
};

export const listActions = () => Object.values(ActionRegistry);
