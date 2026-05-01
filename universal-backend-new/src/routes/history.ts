import { Hono } from "hono";
import {
  getHistory,
  addHistory,
  clearHistory
} from "@/services/useHistory";

export const historyRoute = new Hono();

historyRoute.get("/list", async (c) => {
  const userId = "default"; // replace with auth later
  return c.json(await getHistory(userId));
});

historyRoute.post("/add", async (c) => {
  const userId = "default";
  const { jokeId } = await c.req.json();
  await addHistory(userId, jokeId);
  return c.json({ ok: true });
});

historyRoute.post("/clear", async (c) => {
  const userId = "default";
  await clearHistory(userId);
  return c.json({ ok: true });
});
