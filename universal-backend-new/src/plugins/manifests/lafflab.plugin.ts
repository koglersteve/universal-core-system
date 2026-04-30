import { PluginManifest } from "../runtime/types";

export const lafflabPlugin: PluginManifest = {
  id: "lafflab",
  name: "LAFFlab",
  version: "2.0.0",
  description: "Humor engine, meme generator, joke explorer, and daily ritual enhancer.",
  icon: "😂",

  capabilities: {
    generateJoke: {
      description: "Generate a new joke based on category or mood.",
      args: {
        category: "string?",
        mood: "string?"
      }
    },

    getCategories: {
      description: "Fetch all humor categories.",
      args: {}
    },

    getJokeById: {
      description: "Fetch a single joke by ID.",
      args: {
        id: "string"
      }
    },

    recordView: {
      description: "Record that a joke was viewed.",
      args: {
        id: "string"
      }
    },

    toggleFavorite: {
      description: "Add or remove a joke from favorites.",
      args: {
        id: "string"
      }
    },

    generateDailyRitual: {
      description: "Generate a daily humor ritual.",
      args: {
        mood: "string?"
      }
    }
  },

  ui: {
    surfaces: [
      {
        id: "lafflab-dashboard",
        name: "LAFFlab Dashboard",
        type: "panel",
        route: "/plugins/lafflab"
      },
      {
        id: "lafflab-explore",
        name: "Explore Humor",
        type: "page",
        route: "/plugins/lafflab/explore"
      },
      {
        id: "lafflab-favorites",
        name: "Favorites",
        type: "page",
        route: "/plugins/lafflab/favorites"
      },
      {
        id: "lafflab-settings",
        name: "LAFFlab Settings",
        type: "settings",
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
      role: "curator",
      description: "Curates humor content, categories, and daily rituals.",
      onEvent: ["kernel:health_warning", "emotion:shift"]
    }
  ]
};
