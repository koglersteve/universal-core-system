import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    profile: {},
    message: "Core profile route online",
    updatedAt: Date.now()
  })
);

export default router;

