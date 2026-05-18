import { Hono } from "hono";

export function registerMultiverseRoutes(app: any) {
  const router = new Hono();

  router.get("/", (c) =>
    c.json({
      message: "Multiverse routes online",
      updatedAt: Date.now()
    })
  );

  app.route("/os/multiverse", router);
}
