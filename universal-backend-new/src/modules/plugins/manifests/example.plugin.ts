import { PluginManifest } from "../runtime/types";

const examplePlugin: PluginManifest = {
  id: "example",
  name: "Example Plugin",
  version: "1.0.0",

  capabilities: {
    async ping(args, ctx) {
      return {
        message: "pong",
        args,
        ctx,
        at: Date.now(),
      };
    },

    async generateMeme(args) {
      return {
        meme: `Generated meme: ${args.text}`,
        at: Date.now(),
      };
    },
  },

  autonomyActions: {
    example_generate_meme: {
      capability: "generateMeme",
      description: "Generate a meme using plugin capability",
      defaultArgs: { text: "Stay calm" },
      priority: 3,
    },
  },

  ui: {
    panels: [
      {
        id: "example-dashboard-panel",
        title: "Example Insights",
        location: "dashboard",
        component: "ExampleInsightsPanel",
        props: { pluginId: "example" },
      },
    ],
    settingsPages: [
      {
        id: "example-settings",
        title: "Example Plugin Settings",
        location: "settings",
        component: "ExampleSettingsPage",
      },
    ],
  },

  agents: [
    {
      id: "example-observer",
      name: "Example Observer Agent",
      role: "observer",
      onEvent: async (event, payload) => {
        if (event === "kernel:health_warning") {
          console.log("[ExampleObserverAgent] Saw kernel warning:", payload.message);
        }
      },
    },
  ],

  events: {
    "kernel:health_warning": async (payload) => {
      console.log("[ExamplePlugin] Kernel warning:", payload.message);
    },
  },

  init: async () => {
    console.log("[ExamplePlugin] Initialized");
  },
};

export default examplePlugin;
