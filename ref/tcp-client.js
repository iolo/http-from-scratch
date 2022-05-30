const net = require('net');

const client = new net.Socket();
client.connect(8080, '127.0.0.1', () => {
  client.setEncoding('utf8');
  client.write('GET / HTTP/1.1\r\n');
  client.write('User-Agent: simple-http-client\r\n');
  client.write('\r\n');
  client.write('Hello,World!');
});

client.on('data', (data) => {
  console.log(data);
});
