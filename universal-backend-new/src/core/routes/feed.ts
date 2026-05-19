import { Hono } from "hono";
import prisma from "@/shared/prisma.js";

const router = new Hono();

router.get("/", async (c) => {
  const posts = await prisma.post.findMany().catch(() => []);
  return c.json({
    posts,
    message: "Feed API online",
    updatedAt: Date.now()
  });
});

export default router;
