const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

https.get('https://localhost:8080/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log(data);
  });
});
