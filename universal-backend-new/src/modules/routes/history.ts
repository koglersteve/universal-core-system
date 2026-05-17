// src/modules/routes/history.ts
import { Hono } from "hono";
import { getHistory, addHistory, clearHistory } from "../services/useHistory";

export const historyRoute = new Hono();

historyRoute.get("/list", async (c: any) => {
  const userId = "default";
  return c.json(await getHistory(userId));
});

historyRoute.post("/add", async (c: any) => {
  const userId = "default";
  const { jokeId } = await c.req.json();
  await addHistory(userId, jokeId);
  return c.json({ ok: true });
});

historyRoute.post("/clear", async (c: any) => {
  const userId = "default";
  await clearHistory(userId);
  return c.json({ ok: true });
});
