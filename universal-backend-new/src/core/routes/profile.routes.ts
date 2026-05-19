import { Hono } from "hono";
import prisma from "@/shared/prisma.js";
import { z } from "zod";

const router = new Hono();

router.get("/", (c) => {
  return c.json({
    message: "Profile API online",
    updatedAt: Date.now()
  });
});

export default router;
