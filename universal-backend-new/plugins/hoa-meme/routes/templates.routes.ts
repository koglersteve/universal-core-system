import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

const STATIC_DIR = path.join(__dirname, '..', 'assets', 'templates', 'static');
const ANIMATED_DIR = path.join(__dirname, '..', 'assets', 'templates', 'animated');

// GET /hoa-meme/templates
router.get('/', (req, res) => {
  const staticTemplates = fs.readdirSync(STATIC_DIR).map(file => ({
    type: 'static',
    file,
    path: `/plugins/hoa-meme/templates/static/${file}`
  }));

  const animatedTemplates = fs.readdirSync(ANIMATED_DIR).map(file => ({
    type: 'animated',
    file,
    path: `/plugins/hoa-meme/templates/animated/${file}`
  }));

  res.json({
    static: staticTemplates,
    animated: animatedTemplates
  });
});

export default router;
