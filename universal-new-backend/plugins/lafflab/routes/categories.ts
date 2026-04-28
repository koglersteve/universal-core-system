// C:\AureliaQ_Labs\universal-core-monorepo\universal-core\plugins\lafflab\routes\categories.ts
import { Router } from "express";
import { prisma } from "../db/client";

const router = Router();

router.get("/lafflab/categories", async (_req, res) => {
  const categories = await prisma.lafflabCategories.findMany({
    orderBy: { name: "asc" }
  });
  res.json(categories);
});

export = router;
