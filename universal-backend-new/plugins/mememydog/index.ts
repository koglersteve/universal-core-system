import routes from './routes';
import { dogService } from './services/dog.service';

import { getDogMemeTone } from "./mood";

export const plugin = {
  name: 'mememydog',
  version: '1.0.0',

  register(app: any) {
    app.use('/mememydog', routes);
    app.services.dog = dogService;
  }
};

export function generateDogMeme(userId: string) {
  return {
    tone: getDogMemeTone(userId),
    timestamp: new Date().toISOString(),
  };
}

