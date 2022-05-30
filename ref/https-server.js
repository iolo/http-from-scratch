const https = require('https');
const fs = require('fs');

const server = https.createServer(
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  },
  (req, res) => {
    console.log(req.method, req.url, req.httpVersion);
    console.log(req.headers);
    res.writeHead(200);
    res.end('Hello,World!\n');
  }
);
server.listen(8080);
