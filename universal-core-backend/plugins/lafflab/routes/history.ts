// C:\AureliaQ_Labs\universal-core-monorepo\universal-core\plugins\lafflab\routes\history.ts
import { Router } from "express";
import { prisma } from "../db/client";

const router = Router();

router.get("/lafflab/history", async (req, res) => {
  const userId = req.user.id;

  const history = await prisma.lafflabHistory.findMany({
    where: { user_id: userId },
    include: { joke: true },
    orderBy: { seen_at: "desc" }
  });

  res.json(history);
});

router.post("/lafflab/history/add", async (req, res) => {
  const userId = req.user.id;
  const { jokeId } = req.body;

  const entry = await prisma.lafflabHistory.create({
    data: { user_id: userId, joke_id: jokeId }
  });

  res.json(entry);
});

export = router;
