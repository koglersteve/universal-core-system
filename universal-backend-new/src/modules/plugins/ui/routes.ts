import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    ui: "Plugin UI system online",
    updatedAt: Date.now()
  })
);

export function registerPluginUIRoutes(app: Hono) {
  app.route("/plugins/ui", router);
}
