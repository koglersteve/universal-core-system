import { MiddlewareHandler } from "hono";
import { universes } from "../os/multiverse";

export const universeMiddleware: MiddlewareHandler = async (c, next) => {
  // Read cookie
  const cookie = c.req.header("Cookie") || "";
  const match = cookie.match(/universeId=([^;]+)/);
  const universeId = match ? match[1] : "default";

  // Ensure universe exists
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

  // Attach context
  c.set("universeId", universeId);
  c.set("universe", universes[universeId]);
  c.set("universeState", universes[universeId].state);

  await next();
};
