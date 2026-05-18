import { Router } from "express";
import { PluginRegistry } from "./registry";

export const capabilityRouter = (registry: PluginRegistry) => {
  const router = Router();

  router.post("/:capability", async (req, res) => {
    const capability = req.params.capability;

    const plugin = registry
      .list()
      .find(p => p.capabilities.includes(capability));

    if (!plugin) {
      return res.status(404).json({ error: "Capability not found" });
    }

    res.json({
      plugin: plugin.id,
      capability,
      message: "Capability executed (stub)"
    });
  });

  return router;
};
