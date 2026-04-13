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
    modules: ["emotion", "signal", "state", "identity", "persona"],
  });
});

// --- Emotional OS Namespace (Hybrid Model) ---

const emotion = new Hono();

emotion.get("/", (c) => {
  return c.json({
    message: "Emotional OS online",
    canonical: true,
    model: "hybrid",
  });
});

emotion.get("/state", (c) => {
  return c.json({
    mood: "neutral",
    intensity: 0,
    lastUpdated: null,
  });
});

emotion.post("/update", async (c) => {
  const body = await c.req.json();

  return c.json({
    received: body,
    status: "ok",
    canonical: true,
  });
});

os.route("/emotion", emotion);

// --- Signal OS Namespace (Hybrid Model + Auto-Mirror) ---

const signal = new Hono();

signal.get("/", (c) => {
  return c.json({
    message: "Signal OS online",
    canonical: true,
    model: "hybrid",
    autoMirror: true,
  });
});

signal.get("/state", (c) => {
  const mirrored = {
    mood: "neutral",
    tone: "soft",
    intensity: 0,
    channel: "default",
    lastBroadcast: null,
  };

  return c.json(mirrored);
});

signal.post("/update", async (c) => {
  const body = await c.req.json();

  return c.json({
    received: body,
    status: "ok",
    canonical: true,
    override: true,
  });
});

os.route("/signal", signal);

// --- State OS Namespace (auto-mirroring Emotion + Signal) ---

const state = new Hono();

state.get("/", (c) => {
  return c.json({
    emotional: {
      mood: "neutral",
      intensity: 0,
    },
    signal: {
      tone: "soft",
      intensity: 0,
    },
    timestamp: Date.now(),
  });
});

state.get("/full", (c) => {
  return c.json({
    emotional: {
      mood: "neutral",
      intensity: 0,
      lastUpdated: null,
    },
    signal: {
      tone: "soft",
      intensity: 0,
      channel: "default",
      lastBroadcast: null,
    },
    system: {
      kernel: "stable",
      uptimeHint: "boot-sequence",
    },
    timestamp: Date.now(),
  });
});

os.route("/state", state);

// --- Identity OS Namespace (Canonical Identity) ---

const identity = new Hono();

identity.get("/", (c) => {
  return c.json({
    message: "Identity OS online",
    canonical: true,
    model: "persistent",
  });
});

identity.get("/profile", (c) => {
  return c.json({
    id: "anonymous",
    displayName: "Guest",
    roles: [],
    traits: {
      mode: "observer",
    },
    lastUpdated: null,
  });
});

identity.post("/update", async (c) => {
  const body = await c.req.json();

  return c.json({
    received: body,
    status: "ok",
    canonical: true,
  });
});

os.route("/identity", identity);

// --- Persona OS Namespace (Dynamic, Context-Adaptive) ---

const persona = new Hono();

// Confirms Persona OS is online
persona.get("/", (c) => {
  return c.json({
    message: "Persona OS online",
    canonical: true,
    model: "dynamic-context-adaptive",
  });
});

// Dynamic persona selection (stubbed logic)
persona.get("/current", (c) => {
  // Future: compute persona from emotional + signal + identity
  const computedPersona = {
    persona: "neutral-guide",
    reason: "Default persona for neutral emotional + signal state",
    adaptive: true,
    lastComputed: Date.now(),
  };

  return c.json(computedPersona);
});

// Manual override
persona.post("/override", async (c) => {
  const body = await c.req.json();

  return c.json({
    received: body,
    status: "ok",
    override: true,
    adaptive: false,
  });
});

// Mount Persona OS namespace
os.route("/persona", persona);

// Mount OS namespace
app.route("/os", os);

// --- Boot Kernel ---

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Kernel running on port ${port}`);
