import { Hono } from "hono";

export const state = new Hono();

state.get("/", (c) =>
  c.json({
    emotional: { mood: "neutral", intensity: 0 },
    signal: { tone: "soft", intensity: 0 },
    timestamp: Date.now(),
  })
);

state.get("/full", (c) =>
  c.json({
    emotional: { mood: "neutral", intensity: 0, lastUpdated: null },
    signal: {
      tone: "soft",
      intensity: 0,
      channel: "default",
      lastBroadcast: null,
    },
    system: { kernel: "stable", uptimeHint: "boot-sequence" },
    timestamp: Date.now(),
  })
);
