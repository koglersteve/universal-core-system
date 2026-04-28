import routes from './routes';
import { idlyilyService } from './services/idlyily.service';

import { getIdlyilyPrompt } from "./mood";

export const plugin = {
  name: 'idlyily',
  version: '1.0.0',

  register(app: any) {
    app.use('/idlyily', routes);
    app.services.idlyily = idlyilyService;
  }
};

export function generateIdlyily(userId: string) {
  return {
    prompt: getIdlyilyPrompt(userId),
    timestamp: new Date().toISOString(),
  };
}


