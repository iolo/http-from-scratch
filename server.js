const { Server } = require('net');

const server = new Server();

server.on('connection', (socket) => {
  console.log('server:connection!');
  console.log(`* local: ${socket.localAddress}:${socket.localPort}`);
  console.log(`* remote: ${socket.remoteAddress}:${socket.remotePort}`);

  socket.setEncoding('UTF-8');

  socket.on('data', (data) => {
    console.log('server:socket:data', data);

    const [headPart, bodyPart] = data.split('\r\n\r\n', 2);

    const [requestLine, ...headerLines] = headPart.split('\r\n');
    const [method, requestUri, httpVersion] = requestLine.split(' ', 3);
    const headers = headerLines.reduce((result, headerLine) => {
      const [name, value] = headerLine.split(':', 2);
      result[name.trim().toLowerCase()] = value.trim();
      return result;
    }, {});

    socket.write('HTTP/1.0 200 OK\r\n');
    socket.write('Server: server/0.0.1\r\n');
    socket.write('Content-Type: text/plain\r\n');
    socket.write('\r\n');
    socket.write('Hello,World!\r\n');
    socket.write(`method: ${method}\r\n`);
    socket.write(`requestUri: ${requestUri}\r\n`);
    socket.write(`httpVersion: ${httpVersion}\r\n`);
    socket.write('headers:\r\n');
    for (const [name, value] of Object.entries(headers)) {
      socket.write(`* ${name}:${value}\r\n`);
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

