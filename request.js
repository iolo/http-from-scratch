function parseRequest(data) {
  const [head, body] = data.split('\r\n\r\n', 2);
  const [requestLine, ...headerLines] = head.split('\r\n');
  const [method, requestUri, httpVersion] = requestLine.split(' ', 3);
  const headers = headerLines.reduce((result, headerLine) => {
    const [name, value] = headerLine.split(':', 2);
    result[name.trim().toLowerCase()] = value.trim();
    return result;
  }, {});
  return {
    method: method.toUpperCase(),
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
