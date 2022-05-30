const net = require('net');

const server = net.createServer();

server.on('connection', (socket) => {
  socket.setEncoding('utf8');
  socket.write('HTTP/1.1 200 OK\r\n');
  socket.write('Server: simple-http-server\r\n');
  socket.write('\r\n');
  socket.write('Hello,World!\r\n');
  socket.on('data', (data) => {
    console.log(data);
    socket.end();
  });
});

server.listen(8080);
