import { Hono } from "hono";

const router = new Hono();

router.get("/feed", (c) =>
  c.json({
    items: [],
    message: "HOA Meme feed online",
    updatedAt: Date.now()
  })
);

export default router;
