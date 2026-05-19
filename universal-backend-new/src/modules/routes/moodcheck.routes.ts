import { Hono } from "hono";
import prisma from "@/shared/prisma.js";

const router = new Hono();

router.get("/", async (c) => {
  return c.json({
    message: "Moodcheck API online",
    updatedAt: Date.now()
  });
});

export default router;
