import { Hono } from "hono";
import { CrossAppService } from "./crossapp.service.js";

const router = new Hono();

router.post("/", async c => {
  const body = await c.req.json();
  const result = CrossAppService.handleImpression(body);
  return c.json(result);
});

export default router;
