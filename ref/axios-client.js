const axios = require('axios');

(async () => {
  return axios.get('http://127.0.0.1:8080');
})
  .then(console.log)
  .catch(console.error);
