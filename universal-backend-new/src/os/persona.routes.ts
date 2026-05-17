import { Hono } from "hono";

const personas: Record<string, any> = {};

export function registerPersonaRoutes(app: Hono) {
  // List personas
  app.get("/persona/list", (c) => {
    return c.json({ personas });
  });

  // Create persona
  app.post("/persona/create", async (c) => {
    const body = await c.req.json();
    const id = body.id;

    personas[id] = {
      id,
      name: body.name || id,
      traits: body.traits || {},
      emotionalBaseline: body.emotionalBaseline || { mood: "neutral", intensity: 0 },
      createdAt: Date.now(),
    };

    return c.json({ success: true, persona: personas[id] });
  });

  // Get persona
  app.get("/persona/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ persona: personas[id] || null });
  });

  // Update persona
  app.post("/persona/:id/update", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();

    if (!personas[id]) return c.json({ error: "Persona not found" }, 404);

    personas[id] = { ...personas[id], ...body };

    return c.json({ success: true, persona: personas[id] });
  });

  // Switch persona (cookie)
  app.post("/persona/switch/:id", (c) => {
    const id = c.req.param("id");

    c.header(
      "Set-Cookie",
      `personaId=${id}; Path=/; HttpOnly; SameSite=Lax; Secure`
    );

    return c.json({ success: true, personaId: id });
  });
}
