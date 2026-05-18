import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    posts: [],
    message: "Core posts route online",
    updatedAt: Date.now()
  })
);

export default router;
