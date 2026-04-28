// C:\AureliaQ_Labs\universal-core-monorepo\universal-core\plugins\lafflab\routes\premium.ts
import { Router } from "express";
import { PremiumService } from "../services/PremiumService";

const router = Router();

router.get("/lafflab/premium", async (req, res) => {
  const userId = req.user.id;
  const premium = await PremiumService.isPremium(userId);
  res.json({ premium });
});

router.post("/lafflab/premium/activate", async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const result = await PremiumService.activate(userId, productId);
  res.json(result);
});

export = router;
