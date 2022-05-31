const { parseHeaderLines } = require('./header');

function parseStatusLine(requestLine) {
  const [httpVersion, statusCode, reasonPhase] = requestLine.split(' ', 3);
  return { httpVersion, statusCode, reasonPhase };
}

function parseResponse(data) {
  const [head, body] = data.split('\r\n\r\n', 2);
  const [statusLine, ...headerLines] = head.split('\r\n');
  const { httpVersion, statusCode, reasonPhase } = parseStatusLine(statusLine);
  const headers = parseHeaderLines(headerLines);
  return {
    httpVersion,
    statusCode,
    reasonPhase,
    headers,
    body,
    _raw: data,
  };
}

module.exports = {
  parseResponse,
};
