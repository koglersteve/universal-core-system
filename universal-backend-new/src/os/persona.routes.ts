import type { Hono } from "hono";
import { Multiverse } from "./multiverse";
import { Persona } from "./persona";

export function registerPersonaRoutes(app: Hono) {
  app.get("/persona/state", (c) => {
    const universe = Multiverse.ensureDefault();
    const traits = universe.state.identity.traits;
    const emotion = universe.state.emotion;
    const persona = Persona.fromTraitsAndEmotion(traits, emotion.label, emotion.intensity);
    return c.json(persona);
  });
}
