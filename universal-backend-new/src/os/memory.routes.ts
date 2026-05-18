import { Hono } from "hono";

export function registerMemoryRoutes(app: any) {
  const router = new Hono();

  router.get("/", (c) =>
    c.json({
      message: "Memory routes online",
      updatedAt: Date.now()
    })
  );

  app.route("/os/memory", router);
}

