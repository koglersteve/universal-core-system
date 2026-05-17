// src/os/multiverse.ts
import crypto from "crypto";
import { Hono } from "hono";
import { deepDiff } from "../shared/utils/deepDiff";

export const universes: Record<string, any> = {};

export const createUniverse = () => ({
  id: crypto.randomUUID(),
  createdAt: Date.now(),
  parent: null as string | null,
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

export const multiverse = new Hono();

multiverse.post("/create", (c: any) => {
  const u = createUniverse();
  universes[u.id] = u;

  return c.json({
    status: "ok",
    universe: u,
  });
});

multiverse.get("/list", (c: any) => {
  return c.json({
    universes: Object.values(universes),
  });
});

multiverse.get("/snapshot/:id", (c: any) => {
  const id = c.req.param("id");
  const universe = universes[id];

  if (!universe) {
    return c.json({ error: "Universe not found" });
  }

  return c.json(universe);
});

multiverse.post("/branch/:id", (c: any) => {
  const id = c.req.param("id");
  const parent = universes[id];

  if (!parent) {
    return c.json({ error: "Universe not found" });
  }

  const child = createUniverse();
  child.parent = id;
  child.state = JSON.parse(JSON.stringify(parent.state));

  universes[child.id] = child;

  return c.json({
    status: "ok",
    universe: child,
  });
});

multiverse.get("/diff/:a/:b", (c: any) => {
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
