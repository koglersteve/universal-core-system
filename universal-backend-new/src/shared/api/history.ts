import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) => {
  return c.json({
    items: [],
    message: "History API stubbed.",
  });
});

export default router;
