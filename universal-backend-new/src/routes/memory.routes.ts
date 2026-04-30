import { Hono } from "hono";

const memoryEvents: any[] = [];

export function registerMemoryRoutes(app: Hono) {
  // Log event
  app.post("/memory/event", async (c) => {
    const body = await c.req.json();

    const event = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: body.type || "event",
      universe: c.get("universeId"),
      persona: c.get("personaId"),
      payload: body.payload || {},
    };

    memoryEvents.push(event);

    return c.json({ success: true, event });
  });

  // Recent events
  app.get("/memory/recent", (c) => {
    return c.json({ events: memoryEvents.slice(-50) });
  });

  // Universe-specific memory
  app.get("/memory/universe/:id", (c) => {
    const id = c.req.param("id");
    const filtered = memoryEvents.filter((e) => e.universe === id);
    return c.json({ events: filtered });
  });

  // Persona-specific memory
  app.get("/memory/persona/:id", (c) => {
    const id = c.req.param("id");
    const filtered = memoryEvents.filter((e) => e.persona === id);
    return c.json({ events: filtered });
  });
}
