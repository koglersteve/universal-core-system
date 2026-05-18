import { Hono } from "hono";

export function createKernel() {
  const app = new Hono();

  app.get("/health", (c) =>
    c.json({
      status: "ok",
      ts: new Date().toISOString()
    })
  );

  // extend later with OS kernel behavior
  return app;
}
