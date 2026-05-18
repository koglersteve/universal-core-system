import type { Hono } from "hono";
import { OSStateManager } from "./state";

const state = OSStateManager.create();

export function registerCognitiveRoutes(app: Hono) {
  app.get("/cognitive/state", (c) => c.json(state.cognitive));
}
