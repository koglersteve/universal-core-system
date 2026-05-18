import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    message: "Multiverse routes online",
    updatedAt: Date.now()
  })
);

export default router;
