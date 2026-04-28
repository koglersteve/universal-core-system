import { Hono } from "hono";

export function registerLaffLabRoutes(app: Hono) {
  app.get("/api/lafflab/random", (c) => {
    return c.json({
      status: "ok",
      joke: "Why did the OS cross the road? To get out of offline mode."
    });
  });
}
