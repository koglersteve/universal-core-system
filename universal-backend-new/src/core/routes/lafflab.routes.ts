import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    items: [],
    message: "Core LaffLab route online",
    updatedAt: Date.now()
  })
);

export default router;
