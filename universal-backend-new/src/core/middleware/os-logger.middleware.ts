import type { Context, Next } from "hono";

export const emotionalOSLogger = async (c: Context, next: Next) => {
  const start = Date.now();

  // Extract request metadata
  const method = c.req.method;
  const path = c.req.path;
  const sourceApp = c.req.header("x-source-app") ?? "unknown";
  const userId = c.req.header("x-user-id") ?? "anonymous";

  // Emotional OS pre‑processing hook
  console.log("[EmotionalOS][pre]", {
    event: "request_in",
    method,
    path,
    userId,
    sourceApp,
    at: new Date().toISOString(),
  });

  await next();

  const duration = Date.now() - start;

  // Emotional OS post‑processing hook
  console.log("[EmotionalOS][post]", {
    event: "request_out",
    method,
    path,
    userId,
    sourceApp,
    status: c.res.status,
    durationMs: duration,
    at: new Date().toISOString(),
  });
};
