import { Router } from "express";
import { CrossAppService } from "../services/CrossAppService";

const router = Router();

router.post("/lafflab/cross-app", async (req, res) => {
  const userId = req.user.id;
  const { jokeId, targetApp } = req.body;

  const link = await CrossAppService.createLink({
    userId,
    jokeId,
    targetApp
  });

  res.json(link); // { deepLinkUrl }
});

export = router;
