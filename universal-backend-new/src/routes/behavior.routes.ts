import { Hono } from "hono";

export function registerBehaviorRoutes(app: Hono) {
  // Get behavior state
  app.get("/behavior/state", (c) => {
    const universe = c.get("universe");
    const state = universe.state.behavior || {
      mode: "idle",
      lastAction: null,
    };
    return c.json({ behavior: state });
  });

  // Update behavior mode
  app.post("/behavior/state/update", async (c) => {
    const universe = c.get("universe");
    const body = await c.req.json();

    universe.state.behavior = {
      ...universe.state.behavior,
      ...body,
    };

    return c.json({ success: true, behavior: universe.state.behavior });
  });

  // Execute a behavior
  app.post("/behavior/execute", async (c) => {
    const universe = c.get("universe");
    const persona = c.get("personaId");
    const body = await c.req.json();

    const action = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      universe: universe.id,
      persona,
      behavior: body.behavior || "unknown",
      context: body.context || {},
      result: `Executed behavior: ${body.behavior}`,
    };

    if (!universe.state.behavior.actions) {
      universe.state.behavior.actions = [];
    }

    universe.state.behavior.actions.push(action);

    return c.json({ success: true, action });
  });
}
