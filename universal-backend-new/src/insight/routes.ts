import type { Hono } from "hono";
import { insightEngine } from "./engine";

export function registerInsightRoutes(app: Hono) {
  app.get("/insights/recent", (c) => {
    const limit = Number(c.req.query("limit") ?? "50");
    return c.json(insightEngine.listRecent(limit));
  });
}
