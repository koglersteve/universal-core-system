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
    modules: ["emotion"],
  });
});

// --- Emotional OS Namespace (Hybrid Model) ---

const emotion = new Hono();

// Confirms Emotional OS is online
emotion.get("/", (c) => {
  return c.json({
    message: "Emotional OS online",
    canonical: true,
    model: "hybrid",
  });
});

// Canonical emotional state (backend-owned)
emotion.get("/state", (c) => {
  return c.json({
    mood: "neutral",
    intensity: 0,
    lastUpdated: null,
  });
});

// Update canonical emotional state
emotion.post("/update", async (c) => {
  const body = await c.req.json();

  // Future: write to datastore
  return c.json({
    received: body,
    status: "ok",
    canonical: true,
  });
});

// Mount Emotional OS namespace
os.route("/emotion", emotion);

// Mount OS namespace
app.route("/os", os);

// --- Boot Kernel ---

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Kernel running on port ${port}`);
