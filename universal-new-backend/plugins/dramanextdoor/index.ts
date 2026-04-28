import routes from './routes';
import { dramaService } from './services/drama.service';

import { getDramaLevel } from "./mood";

export const plugin = {
  name: 'dramanextdoor',
  version: '1.0.0',

  register(app: any) {
    app.use('/dramanextdoor', routes);
    app.services.drama = dramaService;
  }
};

export function generateDrama(userId: string) {
  return {
    drama: getDramaLevel(userId),
    timestamp: new Date().toISOString(),
  };
}
