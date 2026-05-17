import type { Hono } from "hono";

export function registerOSRoutes(app: Hono) {
  app.get("/os", (c) =>
    c.json({
      message: "OS namespace online",
      version: "1.0.0",
      timestamp: Date.now()
    })
  );
}
