import { PluginManifest } from "../runtime/types";

export const LaffLabPlugin: PluginManifest = {
  id: "lafflab",
  name: "LaffLab",
  version: "2.1.0",
  capabilities: ["lafflab:generate", "lafflab:analyze"],

  runtime: {
    onLoad: async (ctx) => {
      ctx.logger.info("[lafflab] Plugin initialized");
    },
    onUnload: async (ctx) => {
      ctx.logger.info("[lafflab] Plugin shutdown");
    }
  }
};
