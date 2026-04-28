import { Hono } from "hono";

export const createKernel = () => {
  const kernel = new Hono();

  // --- Kernel Health ---
  kernel.get("/health", (c) =>
    c.json({ status: "ok", message: "Kernel online" })
  );

  // --- Kernel Version ---
  kernel.get("/version", (c) =>
    c.json({
      name: "universal-core-backend",
      version: "0.0.1",
    })
  );

  // --- Kernel State ---
  kernel.get("/state", (c) =>
    c.json({
      status: "stable",
      mode: "kernel",
      uptimeHint: "boot-sequence",
    })
  );

  return kernel;
};
