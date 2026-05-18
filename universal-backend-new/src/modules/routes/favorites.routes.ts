import { Hono } from "hono";
import { toggleFavorite } from "../../shared/api/favorites";

const router = new Hono();

router.post("/toggle", async (c) => {
  const body = await c.req.json();
  const result = await toggleFavorite(body.id, body.userId || null);
  return c.json(result);
});

export default router;
