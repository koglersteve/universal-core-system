import { Router } from 'express';
import { creationsService } from '../services/creation.services';

const router = Router();

router.get('/', async (req: any, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const creations = await creationsService.listUserCreations(userId);
  res.json(creations);
});

export default router;
