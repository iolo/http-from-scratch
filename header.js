// header names
const ACCEPT = 'accept';
const CONNECTION = 'connection';
const CONTENT_LENGTH = 'content-type';
const CONTENT_TYPE = 'content-type';
const HOST = 'host';
const SERVER = 'server';
const USER_AGENT = 'user-agent';

// header values
const ACCEPT_ALL = '*/*';
const CONNECTION_KEEP_ALIVE = 'keep-alive';
const CONNECTION_CLOSE = 'close';

function parseHeaderLine(headerLine) {
  const [name, value] = headerLine.split(':', 2);
  return { name: name.trim().toLowerCase(), value: value?.trim() };
}

function parseHeaderLines(headerLines) {
  const headers = {};
  for (const headerLine of headerLines) {
    const { name, value } = parseHeaderLine(headerLine);
    headers[name] = value;
  }
  return headers;
}

// https://datatracker.ietf.org/doc/html/rfc2616#section-3.7
function parseContentType(mediaType) {
  const [type, ...params] = mediaType.split(';');
  return parameters.reduce(
    (result, param) => {
      const [key, value] = param.split('=', 2);
      result[key.trim()] = value?.trim();
      return result;
    },
    { type: type.trim().toLowerCase() }
  );
}

module.exports = {
  parseHeaderLines,
  parseContentType,
};
