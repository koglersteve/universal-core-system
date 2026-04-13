import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

// --- Kernel Namespace ---

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

app.route("/kernel", kernel);

// --- Root Routes (temporary) ---

app.get("/health", (c) => {
  return c.json({ status: "ok", message: "Kernel online" });
});

app.get("/version", (c) => {
  return c.json({
    name: "universal-core-backend",
    version: "0.0.1",
  });
});

app.get("/state", (c) => {
  return c.json({
    status: "stable",
    mode: "kernel",
    uptimeHint: "boot-sequence",
  });
});

// --- OS Namespace ---

const os = new Hono();

os.get("/", (c) => {
  return c.json({
    message: "OS namespace online",
    modules: [],
  });
});

app.route("/os", os);

// --- Boot Kernel ---

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Kernel running on port ${port}`);
