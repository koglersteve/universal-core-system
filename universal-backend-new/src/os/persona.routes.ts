import { Hono } from "hono";

export function registerPersonaRoutes(app: any) {
  const router = new Hono();

  router.get("/", (c) =>
    c.json({
      message: "Persona routes online",
      updatedAt: Date.now()
    })
  );

  app.route("/os/persona", router);
}
