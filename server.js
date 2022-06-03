const { Server } = require('net');
const fs = require('fs');
const path = require('path');
const { parseUrl, parseQueryString } = require('./url');
const { getMediaType } = require('./media');
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

    if (method === 'POST') {
      const requestContentType = headers['content-type'];
      if (requestContentType === 'application/x-www-form-urlencoded') {
        const params = parseQueryString(body);
        console.log(params);
        socket.write('HTTP/1.0 200 OK\r\n');
        socket.write('Server: 0.0.1\r\n');
        socket.write('Content-Type: text/plain\r\n');
        socket.write('\r\n');
        for (const [key, value] of Object.entries(params)) {
          socket.write(`${key} = ${value}\r\n`);
        }
      }
      socket.end();
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
      socket.write('HTTP/1.0 404 NOT FOUND\r\n');
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

