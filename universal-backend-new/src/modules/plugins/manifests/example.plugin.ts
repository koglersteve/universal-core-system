import type { PluginDefinition } from "../runtime/types.js";

export const ExamplePlugin: PluginDefinition = {
  id: "example",
  name: "Example Plugin",
  version: "1.0.0",
  capabilities: ["example"]
};

export function exampleCapability(ctx: any) {
  return { ok: true, ctx };
}
