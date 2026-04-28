import { Router } from 'express';
import { templateService } from '../services/template.services';

const router = Router();

router.get('/', (req, res) => {
  res.json(templateService.getTemplates());
});

export default router;
