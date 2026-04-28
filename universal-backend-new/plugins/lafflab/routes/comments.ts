import { commentsService } from '../services/comments.service';

export function commentsRoutes(req, res) {
  const url = req.url || '';
  const method = req.method || 'GET';

  // GET /laff/comments?clipId=123
  if (url.startsWith('/laff/comments') && method === 'GET') {
    const clipId = Number(new URL(req.url, 'http://x').searchParams.get('clipId'));
    commentsService.list(clipId).then(list => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(list));
    });
    return;
  }

  // POST /laff/comments
  if (url.startsWith('/laff/comments') && method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const data = JSON.parse(body);
      commentsService.create(data.clipId, data.text, data.userId).then(comment => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comment));
      });
    });
    return;
  }
}
