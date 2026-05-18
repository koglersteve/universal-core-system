import type { Hono } from "hono";
import { OSStateManager } from "./state";
import { EmotionalEngine } from "./engine";

const state = OSStateManager.create();

export function registerEmotionRoutes(app: Hono) {
  app.get("/emotion/state", (c) => c.json(state.emotion));

  app.post("/emotion/event", async (c) => {
    const body = await c.req.json();
    const next = EmotionalEngine.applyEvent(state, {
      type: body.type,
      payload: body.payload
    });
    Object.assign(state, next);
    return c.json(state.emotion);
  });
}

