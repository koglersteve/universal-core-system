import { Hono } from "hono";
import { deepDiff } from "../utils/deepDiff";

// --- Exported universe registry (used by middleware + routes) ---
export const universes: Record<string, any> = {};

// --- Universe Factory ---
export const createUniverse = () => ({
  id: crypto.randomUUID(),
  createdAt: Date.now(),
  parent: null as string | null,   // <-- FIXED: allow string or null
  state: {
    emotion: { mood: "neutral", intensity: 0 },
    signal: { tone: "soft", intensity: 0 },
    identity: { id: "anonymous", traits: {} },
    persona: { persona: "neutral-guide" },
    cognitive: {},
    memory: {},
    intent: {},
    boundary: {},
    tempo: {},
    energy: {},
    attention: {},
    ethics: {},
    world: {},
    harmony: {},
  },
});

// --- Multiverse Router ---
export const multiverse = new Hono();

// --- Create a new universe ---
multiverse.post("/create", (c) => {
  const u = createUniverse();
  universes[u.id] = u;

  return c.json({
    status: "ok",
    universe: u,
  });
});

// --- List universes ---
multiverse.get("/list", (c) => {
  return c.json({
    universes: Object.values(universes),
  });
});

// --- Get universe snapshot ---
multiverse.get("/snapshot/:id", (c) => {
  const id = c.req.param("id");
  const universe = universes[id];

  if (!universe) {
    return c.json({ error: "Universe not found" });
  }

  return c.json(universe);
});

// --- Branch a universe ---
multiverse.post("/branch/:id", (c) => {
  const id = c.req.param("id");
  const parent = universes[id];

  if (!parent) {
    return c.json({ error: "Universe not found" });
  }

  const child = createUniverse();
  child.parent = id; // now valid because parent: string | null

  // Deep clone parent state
  child.state = JSON.parse(JSON.stringify(parent.state));

  universes[child.id] = child;

  return c.json({
    status: "ok",
    universe: child,
  });
});

// --- Deep diff two universes ---
multiverse.get("/diff/:a/:b", (c) => {
  const a = universes[c.req.param("a")];
  const b = universes[c.req.param("b")];

  if (!a || !b) {
    return c.json({ error: "Universe not found" });
  }

  const stateDiff = deepDiff(a.state, b.state);

  return c.json({
    from: a.id,
    to: b.id,
    createdAt: {
      from: a.createdAt,
      to: b.createdAt,
    },
    parent: {
      from: a.parent,
      to: b.parent,
    },
    stateDiff,
  });
});
