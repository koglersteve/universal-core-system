import { Hono } from "hono";

export function registerEmotionRoutes(app: Hono) {
  // Get emotional state
  app.get("/emotion/state", (c) => {
    const universe = c.get("universe");
    const state = universe.state.emotion || {
      mood: "neutral",
      intensity: 0,
    };
    return c.json({ emotion: state });
  });

  // Update emotional state
  app.post("/emotion/state/update", async (c) => {
    const universe = c.get("universe");
    const body = await c.req.json();

    universe.state.emotion = {
      ...universe.state.emotion,
      ...body,
    };

    return c.json({ success: true, emotion: universe.state.emotion });
  });

  // Emotional reaction
  app.post("/emotion/react", async (c) => {
    const universe = c.get("universe");
    const persona = c.get("personaId");
    const body = await c.req.json();

    const reaction = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      universe: universe.id,
      persona,
      trigger: body.trigger || "",
      mood: body.mood || "neutral",
      intensity: body.intensity || 0,
    };

    if (!universe.state.emotion.reactions) {
      universe.state.emotion.reactions = [];
    }

    universe.state.emotion.reactions.push(reaction);

    return c.json({ success: true, reaction });
  });
}
