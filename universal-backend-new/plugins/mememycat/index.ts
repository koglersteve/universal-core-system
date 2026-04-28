import routes from './routes';
import { catService } from './services/cat.service';

import { getCatMemeTone } from "./mood";

export const plugin = {
  name: 'mememycat',
  version: '1.0.0',

  register(app: any) {
    app.use('/mememycat', routes);
    app.services.cat = catService;
  }
};

export function generateCatMeme(userId: string) {
  return {
    tone: getCatMemeTone(userId),
    timestamp: new Date().toISOString(),
  };
}

