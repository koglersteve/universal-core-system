import { Router } from 'express';
import { memeService } from '../services/meme.services';

const router = Router();

router.post('/', async (req: any, res) => {
  const userId = req.user?.id;
  const { imageUrl, template, title, couples } = req.body;

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!imageUrl) return res.status(400).json({ error: 'imageUrl is required' });

  const meme = await memeService.createMeme(userId, imageUrl, template, title, couples);
  res.json(meme);
});

router.get('/:id', async (req, res) => {
  const meme = await memeService.getMemeById(Number(req.params.id));
  if (!meme) return res.status(404).json({ error: 'Not found' });
  res.json(meme);
});

export default router;
