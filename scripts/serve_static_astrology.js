const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.argv[2]) || 8765;
const host = '127.0.0.1';
const root = process.cwd();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4'
};

http.createServer((req, res) => {
  let requestedPath = decodeURIComponent(new URL(req.url, `http://${host}`).pathname);
  if (requestedPath === '/') requestedPath = '/index_astrology.html';

  const filePath = path.normalize(path.join(root, requestedPath));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('forbidden');
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end('not found');
      return;
    }

    res.writeHead(200, {
      'content-type': types[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
    });
    res.end(data);
  });
}).listen(port, host, () => {
  console.log(`Static preview: http://${host}:${port}/index_astrology.html`);
});
