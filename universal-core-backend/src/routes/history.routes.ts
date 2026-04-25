import { Hono } from "hono";

export function registerHistoryRoutes(app: Hono) {
  const route = app.basePath("/history");

  route.get("/list", (c) => {
    const history = [
      { id: "123", viewedAt: Date.now() - 1000 * 60 * 5 },
      { id: "456", viewedAt: Date.now() - 1000 * 60 * 60 }
    ];

    return c.json(history);
  });
}
