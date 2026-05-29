import { Hono } from "hono";
import { CrossAppService } from "../crossapp/crossapp.service.js";
import type { ReactionEmojiKey } from "../crossapp/crossapp.types.js";

const reactions = new Hono();

const ALLOWED_EMOJIS: ReactionEmojiKey[] = [
  "laugh",
  "smile",
  "expressionless",
  "shock",
  "mindblown",
  "angry",
  "crickets",
];

reactions.post("/:postId", async (c) => {
  const postId = c.req.param("postId");

  const body = (await c.req.json().catch(() => ({}))) as {
    userId?: string;
    emoji?: string;
    sourceApp?: string;
  };

  if (!body.userId || !body.emoji) {
    return c.json({ ok: false, error: "userId and emoji required" }, 400);
  }

  if (!ALLOWED_EMOJIS.includes(body.emoji as ReactionEmojiKey)) {
    return c.json(
      {
        ok: false,
        error: "invalid emoji",
        allowed: ALLOWED_EMOJIS,
      },
      400
    );
  }

  const result = await CrossAppService.addReaction({
    userId: body.userId,
    postId,
    emoji: body.emoji as ReactionEmojiKey,
    sourceApp: body.sourceApp,
  });

  return c.json(result);
});

reactions.get("/:postId", async (c) => {
  const postId = c.req.param("postId");
  const result = await CrossAppService.getReactionsForPost(postId);
  return c.json(result);
});

export default reactions;
