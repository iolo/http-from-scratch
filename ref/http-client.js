const http = require('http');
const req = http.get('http://127.0.0.1:8080', (res) => {
  res.on('data', (data) => {
    console.log(data);
  });
});
