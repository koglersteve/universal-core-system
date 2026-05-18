import { Hono } from "hono";
import { pluginRegistry } from "../runtime/registry";

const router = new Hono();

router.get("/list", (c) => {
  return c.json({
    plugins: pluginRegistry.list(),
    count: pluginRegistry.list().length
  });
});

router.get("/:id", (c) => {
  const id = c.req.param("id");
  const plugin = pluginRegistry.get(id);

  if (!plugin) {
    return c.json({ error: "Plugin not found" }, 404);
  }

  return c.json(plugin);
});

export function registerPluginRoutes(app: Hono) {
  app.route("/plugins", router);
}
