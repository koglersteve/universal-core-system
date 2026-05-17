// src/os/middleware/universe.ts
import { MiddlewareHandler } from "hono";
import { universes } from "../multiverse";

export const universeMiddleware: MiddlewareHandler = async (c, next) => {
  const cookie = c.req.header("Cookie") || "";
  const match = cookie.match(/universeId=([^;]+)/);
  const universeId = match ? match[1] : "default";

  if (!universes[universeId]) {
    universes[universeId] = {
      id: universeId,
      createdAt: Date.now(),
      parent: null,
      state: {
        emotion: { mood: "neutral", intensity: 0 },
        signal: { tone: "soft", intensity: 0 },
        identity: { id: "anonymous", traits: {} },
        persona: { persona: "neutral-guide" },
        cognitive: {},
        memory: {},
        intent: {},
        boundary: {},
        tempo: {},
        energy: {},
        attention: {},
        ethics: {},
        world: {},
        harmony: {},
      },
    };
  }

  c.set("universeId", universeId);
  c.set("universe", universes[universeId]);
  c.set("universeState", universes[universeId].state);

  await next();
};
