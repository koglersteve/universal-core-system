import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    settings: {},
    message: "Settings API online",
    updatedAt: Date.now()
  })
);

export default router;
