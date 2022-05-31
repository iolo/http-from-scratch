const { Socket } = require('net');

const client = new Socket();

client.setEncoding('UTF-8');

client.on('data', (data) => {
  console.log('client:data:', data);
});

client.on('end', () => {
  console.log('client:end');
});

client.on('close', function() {
  console.log('client:close');
});

client.on('error', (err) => {
  console.error('client:error:' + err);
});

const host = '0.0.0.0';
const port = 8080;

client.connect({host, port}, 'localhost', () => {
  console.log('client:connect!');
  console.log(`* local: ${client.localAddress}:${client.localPort}`);
  console.log(`* remote: ${client.remoteAddress}:${client.remotePort}`);

  client.write('GET /\r\n');
  client.write('\r\n');
});
