import { Router } from "express";
import { RitualService } from "../services/RitualService";

const router = Router();

router.get("/lafflab/ritual", async (req, res) => {
  const userId = req.user.id;
  const ritual = await RitualService.getTodayRitual(userId);
  res.json(ritual);
});

router.post("/lafflab/ritual/complete", async (req, res) => {
  const userId = req.user.id;
  await RitualService.markCompleted(userId);
  res.json({ ok: true });
});

export = router;
