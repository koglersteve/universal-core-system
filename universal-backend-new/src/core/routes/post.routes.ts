import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";
import { nanoid } from "nanoid";
import { z } from "zod";

const router = new Hono();

router.get("/", async (c) => {
  return c.json({ posts: [] });
});

router.post("/", async (c) => {
  const body = await c.req.json();
  const schema = z.object({ content: z.string() });
  const data = schema.parse(body);

  return c.json({
    ok: true,
    created: {
      id: nanoid(),
      content: data.content,
    },
  });
});

export default router;
