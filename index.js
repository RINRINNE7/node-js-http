'use sterict';
const http = require('http');
const pug = require('pug')
const sever = http.createServer((req, res) => {
  console.info(`Requested by ${req.connection.remoteAddress}`);
  res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
  });

  switch (req.method) {
    case 'GET':
      if (req.url === '/enquetes/yaki-shabu') {
        res.write(pug.renderFile('./form.pug', {
          path: req.url,
          firstItem: '焼き肉',
          secondItem: 'しゃぶしゃぶ'
        }));
      } else if (req.url === '/enquetes/rice-bread') {
        res.write(pug.renderFile('./form.pug', {
          path: req.url,
          firstItem: 'ごはん',
          secondItem: 'パン'
        }));
      } else if (req.url === '/enquetes/susi-pizza') {
        res.write(pug.renderFile('./form.pug', {
          path: req.url,
          firstItem: '寿司',
          secondItem: 'ピザ'
        }));
      } 
      res.end();
      break;
    case 'POST':
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      }).on('end', () => {
        const decoded = decodeURIComponent(body);
        console.info('投稿: ' + decoded);
        res.write(`<h1>${decoded} が投稿されました。</h1>`);
        res.end();
      });
      break;
    case 'DELETE':
      res.write('DELETE ' + req.url);
      res.end();
      break;
    default:
      break;
  }
}).on('error', (e) => {
  console.error('Server Error', e);
}).on('clientError', (e) => {
  console.error('Client Error', e);
});
const port = process.env.PORT || 8000;
sever.listen(port, () => {
  console.info(`ポート ${port} 番でサーバを起動しました`);
});