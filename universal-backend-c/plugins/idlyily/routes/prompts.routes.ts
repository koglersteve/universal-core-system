import { Router } from 'express';
import { promptsService } from '../services/prompts.services';

const router = Router();

router.get('/', async (req: any, res) => {
  const userId = req.user?.id;
  const defaults = promptsService.getDefaultPrompts();
  if (!userId) return res.json({ defaults, custom: [] });

  const custom = await promptsService.getUserPrompts(userId);
  res.json({ defaults, custom });
});

router.post('/', async (req: any, res) => {
  const userId = req.user?.id;
  const { text } = req.body;

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!text) return res.status(400).json({ error: 'text is required' });

  const prompt = await promptsService.createUserPrompt(userId, text);
  res.json(prompt);
});

export default router;
