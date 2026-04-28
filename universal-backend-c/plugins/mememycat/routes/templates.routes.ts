import { Router } from 'express';
import { templateService } from '../services/templates.routes';

const router = Router();

router.get('/', (req, res) => {
  res.json(templateService.getTemplates());
});

export default router;
