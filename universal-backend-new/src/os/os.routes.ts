import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    message: "OS routes online",
    updatedAt: Date.now()
  })
);

export default router;
