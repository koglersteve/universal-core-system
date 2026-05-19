import type { PluginManifest } from "../runtime/types.js";

export const LaffLabPlugin: PluginManifest = {
  id: "lafflab",
  name: "LaffLab",
  version: "2.1.0",

  capabilities: ["lafflab:generate", "lafflab:analyze"],

  runtime: {
    onLoad: async (ctx: any) => {
      ctx.logger.info("[lafflab] Plugin initialized");
    },

    onUnload: async (ctx: any) => {
      ctx.logger.info("[lafflab] Plugin shutdown");
    }
  }
};

// Optional helper function exposed by the plugin
export function laugh(ctx: any) {
  ctx.logger.info("[lafflab] laugh() called");
  return { ok: true };
}
