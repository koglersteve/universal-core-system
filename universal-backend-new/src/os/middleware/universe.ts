import { nanoid } from "nanoid";
import type { MiddlewareHandler } from "hono";

export const universeMiddleware: MiddlewareHandler = async (c, next) => {
  c.set("requestId", nanoid());
  await next();
};
