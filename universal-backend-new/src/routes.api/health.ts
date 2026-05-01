import { Hono } from "hono";
import {
  getHistory,
  addHistory,
  clearHistory
} from "@/services/useHistory";

export const historyRoute = new Hono();

// GET /history/list
historyRoute.get("/list", async (c) => {
  const userId = "default"; // replace with real auth later
  const history = await getHistory(userId);
  return c.json(history);
});

// POST /history/add  { jokeId: string }
historyRoute.post("/add", async (c) => {
  const userId = "default";
  const body = await c.req.json<{ jokeId: string }>();

  if (!body.jokeId) {
    return c.json({ error: "jokeId is required" }, 400);
  }

  await addHistory(userId, body.jokeId);
  return c.json({ ok: true });
});

// POST /history/clear
historyRoute.post("/clear", async (c) => {
  const userId = "default";
  await clearHistory(userId);
  return c.json({ ok: true });
});
