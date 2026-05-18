import { Router } from "express";
import { PluginRegistry } from "../runtime/registry";

export const pluginRouter = (registry: PluginRegistry) => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json(registry.list());
  });

  router.get("/:id", (req, res) => {
    const plugin = registry.get(req.params.id);
    if (!plugin) return res.status(404).json({ error: "Plugin not found" });
    res.json(plugin);
  });

  return router;
};
