import { PluginManifest } from "../runtime/types";

export const lafflabPlugin: PluginManifest = {
  id: "lafflab",
  name: "LAFFlab",
  version: "2.0.0",

  capabilities: {
    generateJoke: {
      args: {
        category: "string?",
        mood: "string?"
      }
    },
    getCategories: {
      args: {}
    },
    getJokeById: {
      args: {
        id: "string"
      }
    },
    recordView: {
      args: {
        id: "string"
      }
    },
    toggleFavorite: {
      args: {
        id: "string"
      }
    },
    generateDailyRitual: {
      args: {
        mood: "string?"
      }
    }
  },

  ui: {
    pages: [
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
        priority: 5,
        defaultArgs: {}
      },
      {
        actionName: "lafflab.autonomy.refreshCategories",
        capability: "getCategories",
        priority: 2,
        defaultArgs: {}
      }
    ]
  },

  agents: [
    {
      id: "lafflab-curator",
      role: "system", // valid AgentRole
      onEvent: async (event, payload) => {
        // placeholder for Step E
      }
    }
  ]
};
