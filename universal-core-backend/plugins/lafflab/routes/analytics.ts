import { Router } from "express";
import { AnalyticsService } from "../services/AnalyticsService";

const router = Router();

router.get("/lafflab/analytics/summary", async (req, res) => {
  const summary = await AnalyticsService.getSummary();
  res.json(summary);
});

export = router;
