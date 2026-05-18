import type { Hono } from "hono";
import { OSStateManager } from "./state";
import { Memory } from "./memory";

const state = OSStateManager.create();

export function registerMemoryRoutes(app: Hono) {
  app.get("/memory/recent", (c) => c.json(state.memory.shortTerm));

  app.get("/memory/long-term", (c) => c.json(state.memory.longTerm));

  app.post("/memory/add", async (c) => {
    const body = await c.req.json();
    state.memory = Memory.add(state.memory, {
      id: body.id || `custom-${Date.now()}`,
      type: body.type || "event",
      payload: body.payload || {},
      weight: body.weight ?? 0.5
    });
    return c.json(state.memory.shortTerm);
  });
}

