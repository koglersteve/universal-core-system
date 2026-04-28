import { commentsService } from '../services/comments.service';

export function commentsRoutes(req, res) {
  const url = req.url || '';
  const method = req.method || 'GET';

  // GET /drama/comments?postId=123
  if (url.startsWith('/drama/comments') && method === 'GET') {
    const postId = Number(new URL(req.url, 'http://x').searchParams.get('postId'));
    commentsService.list(postId).then(list => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(list));
    });
    return;
  }

  // POST /drama/comments
  if (url.startsWith('/drama/comments') && method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const data = JSON.parse(body);
      commentsService.create(data.postId, data.text, data.userId).then(comment => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comment));
      });
    });
    return;
  }
}
