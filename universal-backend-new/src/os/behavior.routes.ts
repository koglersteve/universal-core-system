import { Hono } from "hono";

export function registerBehaviorRoutes(app: any) {
  const router = new Hono();

  router.get("/", (c) =>
    c.json({
      message: "Behavior routes online",
      updatedAt: Date.now()
    })
  );

  app.route("/os/behavior", router);
}
