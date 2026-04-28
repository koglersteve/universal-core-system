import fs from 'fs';
import path from 'path';

export class TemplateService {
  private staticDir = path.join(__dirname, '..', 'assets', 'templates', 'static');
  private animatedDir = path.join(__dirname, '..', 'assets', 'templates', 'animated');

  getTemplates() {
    const staticTemplates = fs.readdirSync(this.staticDir).map(file => ({
      type: 'static',
      file,
      path: `/plugins/hoa-meme/templates/static/${file}`
    }));

    const animatedTemplates = fs.readdirSync(this.animatedDir).map(file => ({
      type: 'animated',
      file,
      path: `/plugins/hoa-meme/templates/animated/${file}`
    }));

    return {
      static: staticTemplates,
      animated: animatedTemplates
    };
  }
}

export const templateService = new TemplateService();
