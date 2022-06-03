const HTTP_0_9 = 'HTTP/0.9';
const HTTP_1_0 = 'HTTP/1.0';
const HTTP_1_1 = 'HTTP/1.1';
const VERSION = HTTP_1_1;
const VERSIONS = [HTTP_0_9, HTTP_1_0, HTTP_1_1];

function isValidVersion(version) {
  return VERSIONS.includes(version);
}

module.exports = {
  HTTP_0_9,
  HTTP_1_0,
  HTTP_1_1,
  VERSION,
  VERSIONS,
  isValidVersion,
};
