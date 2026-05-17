import { Hono } from "hono";

export function createKernel() {
  const router = new Hono();

  router.get("/health", (c) =>
    c.json({
      status: "ok",
      timestamp: Date.now(),
      kernel: "Emotional OS Kernel v1"
    })
  );

  return router;
}
