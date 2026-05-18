import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    posts: [],
    message: "Posts API online",
    updatedAt: Date.now()
  })
);

export default router;
