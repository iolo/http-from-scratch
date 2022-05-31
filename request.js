const { parseHeaderLines } = require('./header');

function parseRequestLine(requestLine) {
  const [method, requestUri, httpVersion] = requestLine.split(' ', 3);
  return { method: method.toUpperCase(), requestUri, httpVersion };
}

function parseRequest(data) {
  const [head, body] = data.split('\r\n\r\n', 2);
  const [requestLine, ...headerLines] = head.split('\r\n');
  const { method, requestUri, httpVersion } = parseRequestLine(requestLine);
  const headers = parseHeaderLines(headerLines);
  return {
    method,
    requestUri,
    httpVersion,
    headers,
    body,
    _raw: data,
  };
}

module.exports = {
  parseRequest,
};
