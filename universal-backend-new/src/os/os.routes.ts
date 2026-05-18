import { Hono } from "hono";

export function registerOSRoutes(app: any) {
  const router = new Hono();

  router.get("/", (c) =>
    c.json({
      message: "OS routes online",
      updatedAt: Date.now()
    })
  );

  app.route("/os", router);
}
