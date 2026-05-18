import { PluginManifest } from "../runtime/types";

export const ExamplePlugin: PluginManifest = {
  id: "example",
  name: "Example Plugin",
  version: "1.0.0",
  capabilities: ["example:run"],

  runtime: {
    onLoad: async (ctx) => {
      ctx.logger.info("[example] Plugin loaded");
    },
    onUnload: async (ctx) => {
      ctx.logger.info("[example] Plugin unloaded");
    }
  }
};
