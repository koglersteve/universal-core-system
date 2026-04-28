import { Router } from "express";
import { EmotionLinkService } from "../services/EmotionLinkService";

const router = Router();

router.post("/lafflab/emotion-link", async (req, res) => {
  const userId = req.user.id;
  const { jokeId, moodBefore, reaction } = req.body;

  const result = await EmotionLinkService.processReaction({
    userId,
    jokeId,
    moodBefore,
    reaction
  });

  res.json(result); // { suggestedAction, targetApp, message }
});

export = router;
