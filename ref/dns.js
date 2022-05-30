const dns = require('dns/promises');

(async () => {
  return dns.lookup('example.com');
})
  .then(console.log)
  .catch(console.error);
