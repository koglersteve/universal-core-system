import { PluginManifest } from "../runtime/types";

export const lafflabPlugin: PluginManifest = {
  id: "lafflab",
  name: "LAFFlab",
  version: "2.0.0",

  capabilities: {
    generateJoke: {},
    getCategories: {},
    getJokeById: {},
    recordView: {},
    toggleFavorite: {},
    generateDailyRitual: {}
  },

  ui: {
    routes: [
      {
        id: "lafflab-dashboard",
        name: "LAFFlab Dashboard",
        route: "/plugins/lafflab"
      },
      {
        id: "lafflab-explore",
        name: "Explore Humor",
        route: "/plugins/lafflab/explore"
      },
      {
        id: "lafflab-favorites",
        name: "Favorites",
        route: "/plugins/lafflab/favorites"
      },
      {
        id: "lafflab-settings",
        name: "LAFFlab Settings",
        route: "/plugins/lafflab/settings"
      }
    ]
  },

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
      role: "assistant", // valid AgentRole
      onEvent: async (event, payload) => {
        // placeholder for Step E
      }
    }
  ]
};
