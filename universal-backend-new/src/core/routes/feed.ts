import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    feed: [],
    message: "Core feed online",
    updatedAt: Date.now()
  })
);

export default router;
