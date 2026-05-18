import { Hono } from "hono";

const router = new Hono();

router.post("/", async (c) => {
  const body = await c.req.json();
  return c.json({
    status: "ok",
    message: "Password reset successful",
    email: body.email || null,
    updatedAt: Date.now()
  });
});

export default router;
