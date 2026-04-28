// C:\AureliaQ_Labs\universal-core-monorepo\universal-core\plugins\lafflab\routes\favorites.ts
import { Router } from "express";
import { prisma } from "../db/client";

const router = Router();

router.get("/lafflab/favorites", async (req, res) => {
  const userId = req.user.id;

  const favorites = await prisma.lafflabFavorites.findMany({
    where: { user_id: userId },
    include: { joke: true }
  });

  res.json(favorites);
});

router.post("/lafflab/favorites/add", async (req, res) => {
  const userId = req.user.id;
  const { jokeId } = req.body;

  const fav = await prisma.lafflabFavorites.upsert({
    where: { user_id_joke_id: { user_id: userId, joke_id: jokeId } },
    update: {},
    create: { user_id: userId, joke_id: jokeId }
  });

  res.json(fav);
});

export = router;
