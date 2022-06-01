const { Socket } = require('net');
const { parseUrl } = require('./url');
const { parseResponse } = require('./response');

const clients = {};

function sendRequest({ method, requestUri }){
  const { origin, host, hostname, port = 80, path = '/', search = '' } = parseUrl(requestUri);
  let client = clients[host];
  if (!client) {
    client = new Socket();

    client.setEncoding('UTF-8');

    client.on('data', (data) => {
      console.log('client:data:', data);
      const { statusCode, headers } = parseResponse(data);
      if (statusCode === '302') {
        sendRequest({ method: 'GET', requestUri: origin + headers.location });
        return;
      }
      //client.end();
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

    client.connect(port, hostname, () => {
      console.log('client:connect!', host);
      console.log(`* local: ${client.localAddress}:${client.localPort}`);
      console.log(`* remote: ${client.remoteAddress}:${client.remotePort}`);
    });

    //clients[host] = client;
  } else {
    console.log('reuse connection:', host);
  }

  client.write(`GET ${path}${search} HTTP/1.1\r\n`);
  client.write(`Host: ${host}\r\n`);
  //client.write(`Connection: keep-alive\r\n`);
  client.write(`Connection: close\r\n`);
  client.write(`Accept: */*\r\n`);
  client.write(`User-Agent: client/0.0.1\r\n`);
  client.write('\r\n');
}

const client = new Socket();

const url = process.argv[2] || 'http://localhost:8080';

sendRequest({ method: 'GET', requestUri: url });

