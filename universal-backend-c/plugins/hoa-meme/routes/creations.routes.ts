import { Router } from 'express';
import { db } from '../db/client';

const router = Router();

// GET /hoa-meme/creations
router.get('/', async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const creations = await db.meme.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  res.json(creations);
});

export default router;
