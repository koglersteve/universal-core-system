import { Hono } from "hono";

const router = new Hono();

// POST /daily-ritual/generate
router.post("/generate", async (c) => {
  const ritual = {
    id: "demo-ritual",
    title: "Daily Laugh Ritual",
    steps: [
      "Open LAFFLab",
      "Watch one joke",
      "Share your favorite with a friend",
    ],
    createdAt: new Date().toISOString(),
  };

  return c.json(ritual);
});

export default router;
