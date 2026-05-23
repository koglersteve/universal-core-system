import { Hono } from "hono";
import { prisma } from "../../../src/core/config/prisma"; // adjust if needed

const reactions = new Hono();

const VALID_REACTIONS = [
  "laugh",
  "smile",
  "expressionless",
  "shock",
  "mindblown",
  "angry",
  "crickets",
] as const;

type ReactionKey = (typeof VALID_REACTIONS)[number];

// POST /lafflab/reactions/:postId/toggle
reactions.post("/reactions/:postId/toggle", async c => {
  const userId = c.get("userId") as string | undefined;
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const { postId } = c.req.param();
  const body = await c.req.json<{ type: ReactionKey }>();
  const { type } = body;

  if (!VALID_REACTIONS.includes(type)) {
    return c.json({ error: "Invalid reaction type" }, 400);
  }

  const prismaType = type.toUpperCase();

  const existing = await prisma.reaction.findUnique({
    where: {
      postId_userId_type: {
        postId,
        userId,
        type: prismaType,
      },
    },
  });

  if (existing) {
    await prisma.reaction.delete({ where: { id: existing.id } });
    return c.json({ postId, type, active: false });
  }

  await prisma.reaction.create({
    data: {
      postId,
      userId,
      type: prismaType,
    },
  });

  // Optionally return updated counts
  const all = await prisma.reaction.findMany({
    where: { postId },
  });

  const counts = {
    laugh: 0,
    smile: 0,
    expressionless: 0,
    shock: 0,
    mindblown: 0,
    angry: 0,
    crickets: 0,
  };

  all.forEach(r => {
    const key = r.type.toLowerCase() as keyof typeof counts;
    if (counts[key] !== undefined) counts[key] += 1;
  });

  return c.json({
    postId,
    type,
    active: true,
    counts,
  });
});

export default reactions;
