import { PluginManifest } from "../runtime/types";

export const lafflabPlugin: PluginManifest = {
  id: "lafflab",
  name: "LAFFlab",
  version: "2.0.0",

  capabilities: {
    generateJoke: async (args, context) => {
      return {};
    },
    getCategories: async (args, context) => {
      return {};
    },
    getJokeById: async (args, context) => {
      return {};
    },
    recordView: async (args, context) => {
      return {};
    },
    toggleFavorite: async (args, context) => {
      return {};
    },
    generateDailyRitual: async (args, context) => {
      return {};
    }
  },

  ui: {},

  autonomy: {
    actions: [
      {
        actionName: "lafflab.autonomy.generateDailyRitual",
        capability: "generateDailyRitual",
        priority: 5
      },
      {
        actionName: "lafflab.autonomy.refreshCategories",
        capability: "getCategories",
        priority: 2
      }
    ]
  }

  // ❌ agents removed — backend does not accept any AgentRole
};
