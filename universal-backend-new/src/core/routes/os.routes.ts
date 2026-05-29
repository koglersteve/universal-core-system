import { Hono } from "hono";
import { EmotionalOS } from "@/core/crossapp/os/os-engine";

const osRoutes = new Hono();

// GET /core/os/state?userId=...
osRoutes.get("/state", (c) => {
  const userId = c.req.query("userId") ?? "anonymous";

  const view = EmotionalOS.snapshot(userId);

  return c.json({
    ok: true,
    userId,
    os: view,
  });
});

export default osRoutes;
