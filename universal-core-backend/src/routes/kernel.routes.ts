import { Hono } from "hono";

export const createKernel = () => {
  const kernel = new Hono();

  kernel.get("/health", (c) => {
    return c.json({ status: "ok", message: "Kernel online" });
  });

  kernel.get("/version", (c) => {
    return c.json({
      name: "universal-core-backend",
      version: "0.0.1",
    });
  });

  kernel.get("/state", (c) => {
    return c.json({
      status: "stable",
      mode: "kernel",
      uptimeHint: "boot-sequence",
    });
  });

  return kernel;
};
