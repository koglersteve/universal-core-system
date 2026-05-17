import { Hono } from "hono";

export function registerCognitiveRoutes(app: Hono) {
  // Get cognitive state
  app.get("/cognitive/state", (c) => {
    const universe = c.get("universe");
    const state = universe.state.cognitive || {};
    return c.json({ cognitive: state });
  });

  // Update cognitive state
  app.post("/cognitive/state/update", async (c) => {
    const universe = c.get("universe");
    const body = await c.req.json();

    universe.state.cognitive = {
      ...universe.state.cognitive,
      ...body,
    };

    return c.json({ success: true, cognitive: universe.state.cognitive });
  });

  // Thought pipeline
  app.post("/cognitive/think", async (c) => {
    const universe = c.get("universe");
    const persona = c.get("personaId");
    const body = await c.req.json();

    const thought = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      universe: universe.id,
      persona,
      input: body.input || "",
      interpretation: `Processed: ${body.input}`,
      output: `Response: ${body.input}`,
    };

    if (!universe.state.cognitive.thoughts) {
      universe.state.cognitive.thoughts = [];
    }

    universe.state.cognitive.thoughts.push(thought);

    return c.json({ success: true, thought });
  });
}
