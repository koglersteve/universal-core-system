import { Hono } from "hono";
import { KernelActions } from "./actions";

export function createKernel() {
  const router = new Hono();

  router.get("/health", (c) =>
    c.json({
      status: "ok",
      timestamp: Date.now()
    })
  );

  router.get("/state", (c) => c.json(KernelActions.summary()));

  router.post("/event", async (c) => {
    const body = await c.req.json().catch(() => ({}));
    const state = KernelActions.applyEvent({
      type: body.type,
      payload: body.payload
    });
    return c.json(state);
  });

  return router;
}
