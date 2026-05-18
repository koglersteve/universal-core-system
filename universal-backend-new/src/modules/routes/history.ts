import { Hono } from "hono";
import { getHistory, addHistory } from "../../shared/api/history";

const router = new Hono();

router.get("/list", async (c) => {
  const items = await getHistory();
  return c.json(items);
});

router.post("/add", async (c) => {
  const body = await c.req.json();
  const record = await addHistory(body.jokeId, body.userId || null);
  return c.json(record);
});

export default router;
