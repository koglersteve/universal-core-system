import fs from 'fs';
import path from 'path';

export class TemplateService {
  private staticDir = path.join(__dirname, '..', 'assets', 'templates', 'static');

  getTemplates() {
    const staticTemplates = fs.readdirSync(this.staticDir).map(file => ({
      type: 'static' as const,
      file,
      path: `/plugins/mememydog/templates/static/${file}`
    }));

    return { static: staticTemplates };
  }
}

export const templateService = new TemplateService();
