import { PluginManifest } from "../runtime/types";

export const lafflabPlugin: PluginManifest = {
  id: "lafflab",
  name: "LAFFlab",
  version: "2.0.0",

  capabilities: {
    generateJoke: async (args, context) => {
      return context.call("generateJoke", args);
    },
    getCategories: async (args, context) => {
      return context.call("getCategories", args);
    },
    getJokeById: async (args, context) => {
      return context.call("getJokeById", args);
    },
    recordView: async (args, context) => {
      return context.call("recordView", args);
    },
    toggleFavorite: async (args, context) => {
      return context.call("toggleFavorite", args);
    },
    generateDailyRitual: async (args, context) => {
      return context.call("generateDailyRitual", args);
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
  },

  agents: [
    {
      id: "lafflab-curator",
      role: "system",
      onEvent: async (event, payload) => {
        // placeholder for Step E
      }
    }
  ]
};
