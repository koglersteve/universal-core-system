import { Router } from 'express';
import { db } from '../db/client';

const router = Router();

// POST /hoa-meme/memes
router.post('/', async (req, res) => {
  const userId = req.user?.id;
  const { imageUrl, template, title } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!imageUrl) {
    return res.status(400).json({ error: 'imageUrl is required' });
  }

  const meme = await db.meme.create({
    data: {
      userId,
      imageUrl,
      template: template || null,
      title: title || null
    }
  });

  res.json(meme);
});

// GET /hoa-meme/memes/:id
router.get('/:id', async (req, res) => {
  const meme = await db.meme.findUnique({
    where: { id: Number(req.params.id) }
  });

  if (!meme) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json(meme);
});

export default router;

