import fs from 'fs';
import path from 'path';

export class TemplateService {
  private staticDir = path.join(__dirname, '..', 'assets', 'templates', 'static');
  private animatedDir = path.join(__dirname, '..', 'assets', 'animated');

  getTemplates() {
    const staticTemplates = fs.existsSync(this.staticDir)
      ? fs.readdirSync(this.staticDir).map(file => ({
          type: 'static' as const,
          file,
          path: `/plugins/mememycat/templates/static/${file}`
        }))
      : [];

    const animatedTemplates = fs.existsSync(this.animatedDir)
      ? fs.readdirSync(this.animatedDir).map(file => ({
          type: 'animated' as const,
          file,
          path: `/plugins/mememycat/animated/${file}`
        }))
      : [];

    return { static: staticTemplates, animated: animatedTemplates };
  }
}

export const templateService = new TemplateService();
