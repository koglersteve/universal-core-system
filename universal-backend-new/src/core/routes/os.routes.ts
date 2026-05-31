import { Hono } from "hono";
import { EmotionalOS } from "@/core/crossapp/os/os-engine.js";

const osRoutes = new Hono();

osRoutes.get("/state/:userId", (c) => {
  const userId = c.req.param("userId");
  const snapshot = EmotionalOS.snapshot(userId);
  return c.json(snapshot);
});

export default osRoutes;
