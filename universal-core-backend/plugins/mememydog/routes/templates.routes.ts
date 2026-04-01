import { Router } from 'express';
import { templateService } from '../services/templates.services';

const router = Router();

router.get('/', (req, res) => {
  res.json(templateService.getTemplates());
});

export default router;
