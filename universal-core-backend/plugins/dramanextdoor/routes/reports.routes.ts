import { reportsService } from '../services/reports.service';

export function reportsRoutes(req, res) {
  if (req.method === 'POST' && req.url.startsWith('/drama/report')) {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const data = JSON.parse(body);
      reportsService.create(data.postId, data.reason, data.userId).then(report => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(report));
      });
    });
  }
}
