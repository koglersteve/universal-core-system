// C:\AureliaQ_Labs\universal-core-monorepo\universal-core\plugins\lafflab\routes\jokes.ts
import { Router } from "express";
import { prisma } from "../db/client";

const router = Router();

router.get("/lafflab/jokes/random", async (_req, res) => {
  const count = await prisma.lafflabJokes.count();
  if (count === 0) return res.json(null);

  const skip = Math.floor(Math.random() * count);
  const joke = await prisma.lafflabJokes.findFirst({
    skip,
    take: 1
  });

  res.json(joke);
});

router.get("/lafflab/jokes/category/:id", async (req, res) => {
  const categoryId = req.params.id;

  const jokes = await prisma.lafflabJokes.findMany({
    where: { category_id: categoryId }
  });

  res.json(jokes);
});

router.get("/lafflab/jokes/search", async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (!q) return res.json([]);

  const jokes = await prisma.lafflabJokes.findMany({
    where: {
      text: {
        contains: q,
        mode: "insensitive"
      }
    }
  });

  res.json(jokes);
});

export = router;
