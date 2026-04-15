import { MiddlewareHandler } from "hono";
import { universes } from "../os/multiverse"; // we will expose this

export const universeMiddleware: MiddlewareHandler = async (c, next) => {
  // 1. Determine active universe ID
  const headerId = c.req.header("x-universe-id");
  const queryId = c.req.query("universe");

  const universeId = headerId || queryId || "default";

  // 2. Load universe state
  const universe = universes[universeId];

  if (!universe) {
    // If universe doesn't exist, create a default one
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

  // 3. Attach universe context to request
  c.set("universeId", universeId);
  c.set("universe", universes[universeId]);
  c.set("universeState", universes[universeId].state);

  // 4. Continue to next handler
  await next();
};
