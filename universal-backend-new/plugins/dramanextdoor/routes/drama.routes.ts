import { dramaService } from '../services/drama.service';

export function dramaRoutes(req: any, res: any) {
  const url = req.url || '';
  const method = req.method || 'GET';

  // GET /drama/feed
  if (url.startsWith('/drama/feed') && method === 'GET') {
    dramaService.list().then(feed => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(feed));
    });
    return;
  }

  // POST /drama/post
  if (url.startsWith('/drama/post') && method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const data = JSON.parse(body || '{}');
      dramaService.create(data).then(post => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(post));
      });
    });
    return;
  }

  // Fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
}
