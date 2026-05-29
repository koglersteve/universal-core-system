import { Hono } from "hono";
import { CrossAppService } from "./crossapp.service.js";

const impressions = new Hono();

impressions.post("/:postId", async (c) => {
  const postId = c.req.param("postId");

  const body = (await c.req.json().catch(() => ({}))) as {
    userId?: string;
    sourceApp?: string;
  };

  if (!body.userId) {
    return c.json({ ok: false, error: "userId required" }, 400);
  }

  const result = await CrossAppService.handleImpression({
    userId: body.userId,
    postId,
    sourceApp: body.sourceApp,
  });

  return c.json(result);
});

impressions.get("/:postId", async (c) => {
  const postId = c.req.param("postId");
  const result = await CrossAppService.getImpressionsForPost(postId);
  return c.json(result);
});

export default impressions;
