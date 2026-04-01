import { Router } from "express";
import { CouplesService } from "../services/CouplesService";

const router = Router();

router.post("/lafflab/couples/session", async (req, res) => {
  const userId = req.user.id;
  const { partnerId } = req.body;
  const session = await CouplesService.startSession(userId, partnerId);
  res.json(session);
});

router.get("/lafflab/couples/feed/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  const feed = await CouplesService.getSharedFeed(sessionId);
  res.json(feed);
});

export = router;
