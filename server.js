const { Server } = require('net');

const server = new Server();

server.on('connection', (socket) => {
  console.log('server:connection!');
  console.log(`* local: ${socket.localAddress}:${socket.localPort}`);
  console.log(`* remote: ${socket.remoteAddress}:${socket.remotePort}`);

  socket.setEncoding('UTF-8');

  socket.on('data', (data) => {
    console.log('server:socket:data', data);

    socket.write('HTTP/1.0 200 OK\r\n');
    socket.write('Server: server/0.0.1\r\n');
    socket.write('Content-Type: text/plain\r\n');
    socket.write('\r\n');
    socket.write('Hello,World!\r\n');
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

