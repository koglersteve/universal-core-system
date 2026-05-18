import type { Hono } from "hono";
import { OSStateManager } from "./state";

const state = OSStateManager.create();

export function registerBehaviorRoutes(app: Hono) {
  app.get("/behavior/state", (c) => c.json(state.behavior));
}
