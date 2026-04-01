import { reactionsService } from '../services/reactions.service';

export function reactionsRoutes(req, res) {
  if (req.method === 'POST' && req.url.startsWith('/laff/react')) {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const data = JSON.parse(body);
      reactionsService.react(data.clipId, data.emoji, data.userId).then(result => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });
    });
  }
}
