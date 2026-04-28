import fs from 'fs';
import path from 'path';

export class TemplateService {
  private staticDir = path.join(__dirname, '..', 'assets', 'templates', 'static');
  private animatedDir = path.join(__dirname, '..', 'assets', 'templates', 'animated');

  getTemplates() {
    const staticTemplates = fs.readdirSync(this.staticDir).map(file => ({
      type: 'static' as const,
      file,
      path: `/plugins/idlyily-meme/templates/static/${file}`
    }));

    const animatedTemplates = fs.readdirSync(this.animatedDir).map(file => ({
      type: 'animated' as const,
      file,
      path: `/plugins/idlyily-meme/templates/animated/${file}`
    }));

    return { static: staticTemplates, animated: animatedTemplates };
  }
}

export const templateService = new TemplateService();

