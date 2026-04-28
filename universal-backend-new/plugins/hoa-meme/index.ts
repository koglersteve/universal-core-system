import memeRoutes from './routes/meme.routes';
import templatesRoutes from './routes/templates.routes';
import creationsRoutes from './routes/creations.routes';

import { memeService } from './services/meme.services';
import { templateService } from './services/template.services';
import { creationsService } from './services/creation.services';

import { getHoaMoodLine } from "./mood";

export const plugin = {
  name: 'hoa-meme',
  version: '1.0.0',

  register(app: any) {
    // Register routes
    app.use('/hoa-meme/memes', memeRoutes);
    app.use('/hoa-meme/templates', templatesRoutes);
    app.use('/hoa-meme/creations', creationsRoutes);

    // Register services
    app.services.meme = memeService;
    app.services.templates = templateService;
    app.services.creations = creationsService;
  }
};

// Mood-aware generator
export function generateHoaMeme(userId: string) {
  return {
    title: "HOA Meme",
    line: getHoaMoodLine(userId),
    timestamp: new Date().toISOString(),
  };
}



