const { Socket } = require('net');
const { parseUrl } = require('./url');
const { parseResponse } = require('./response');

const client = new Socket();

client.setEncoding('UTF-8');

client.on('data', (data) => {
  console.log('client:data:', data);
  const response = parseResponse(data);
  console.log(response);
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

const url = process.argv[2] || 'http://localhost:8080';
const { host, hostname, port = 80, path = '/', search = '' } = parseUrl(url);

client.connect(port, hostname, () => {
  console.log('client:connect!');
  console.log(`* local: ${client.localAddress}:${client.localPort}`);
  console.log(`* remote: ${client.remoteAddress}:${client.remotePort}`);

  client.write(`GET ${path}${search} HTTP/1.0\r\n`);
  client.write(`Host: ${host}\r\n`);
  client.write(`Accept: */*\r\n`);
  client.write(`User-Agent: client/0.0.1\r\n`);
  client.write('\r\n');
});
