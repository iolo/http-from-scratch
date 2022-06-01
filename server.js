const { Server } = require('net');
const fs = require('fs');
const path = require('path');
const { parseUrl, parseQueryString } = require('./url');
const { getMimeType } = require('./mime');
const { parseRequest } = require('./request');

const server = new Server();

server.on('connection', (socket) => {
  console.log('server:connection!');
  console.log(`* local: ${socket.localAddress}:${socket.localPort}`);
  console.log(`* remote: ${socket.remoteAddress}:${socket.remotePort}`);

  socket.setEncoding('UTF-8');

  socket.on('data', (data) => {
    console.log('server:socket:data', data);

    const { method, requestUri, httpVersion, headers, body } = parseRequest(data);

    const isKeepAlive =
      (httpVersion === 'HTTP/1.0' && headers.connection === 'keep-alive') ||
      (httpVersion === 'HTTP/1.1' && headers.connection !== 'close');

    if (method === 'POST') {
      const requestContentType = headers['content-type'];
      if (requestContentType === 'application/x-www-form-urlencoded') {
        const params = parseQueryString(body);
        console.log(params);
        socket.write('HTTP/1.0 200 OK\r\n');
        socket.write('Server: server/0.0.1\r\n');
        socket.write('Content-Type: text/plain\r\n');
        socket.write('\r\n');
        for (const [key, value] of Object.entries(params)) {
          socket.write(`${key} = ${value}\r\n`);
        }
      }
      socket.end();
      return;
    }

    if (requestUri === '/old') {
      socket.write('HTTP/1.1 302 FOUND\r\n');
      socket.write('Connection: keep-alive\r\n');
      socket.write('Server: server/0.0.1\r\n');
      socket.write('Location: /new\r\n');
      socket.write('Content-Length: 0\r\n');
      socket.write('\r\n');
      if (!isKeepAlive) {
        socket.end();
      }
      return;
    }

    if (requestUri === '/new') {
      socket.write('HTTP/1.1 200 OK\r\n');
      socket.write('Connection: keep-alive\r\n');
      socket.write('Server: server/0.0.1\r\n');
      socket.write('Content-Type: text/plain\r\n');
      socket.write('Content-Length: 3\r\n');
      socket.write('\r\n');
      socket.write('new');
      if (!isKeepAlive) {
        socket.end();
      }
      return;
    }

    const url = parseUrl(requestUri);
    const file = path.join('public_html', url.path);
    if (fs.existsSync(file)) {
      const responseContentType = getMimeType(file);
      socket.write('HTTP/1.0 200 OK\r\n');
      socket.write('Server: server/0.0.1\r\n');
      socket.write(`Content-Type: ${responseContentType}\r\n`);
      socket.write('\r\n');
      socket.write(fs.readFileSync(file));
    } else {
      socket.write('HTTP/1.1 404 NOT FOUND\r\n');
      socket.write('Server: server/0.0.1\r\n');
      socket.write('Content-Type: text/plain\r\n');
      socket.write('\r\n');
      socket.write('404 NOT FOUND!\r\n');
    }
    socket.end();
  });

  socket.on('end', () => {
    console.log('server:socket:end');
  });

  socket.on('error', (err) => {
    console.error('server:socket:error:' + err);
  });
});

server.on('close', () => {
  console.log('server:close');
});

server.on('error', (err) => {
  console.log('server:error:', err);
});

server.listen(8080, () => {
  console.log('server:listen:', server.address());
});
