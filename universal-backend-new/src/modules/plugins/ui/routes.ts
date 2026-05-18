import { Hono } from "hono";
import type { PluginRegistry } from "../runtime/registry";

const router = new Hono();

router.get("/", (c) => c.json({ ui: true }));

export default function pluginUiRoutes(_registry: PluginRegistry) {
  return router;
}
