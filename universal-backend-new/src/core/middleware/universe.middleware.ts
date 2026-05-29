import type { Context, Next } from "hono";
import type { UniverseContext } from "./universe.types";

export const universeMiddleware = async (c: Context, next: Next) => {
  const universe: UniverseContext = {
    requestId: crypto.randomUUID?.() ?? Date.now().toString(),
    timestamp: Date.now(),
    path: c.req.path,
    method: c.req.method,
  };

  // Attach universe context to request
  c.set("universe", universe);

  await next();
};
