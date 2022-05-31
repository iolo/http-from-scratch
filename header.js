function parseHeaderLine(headerLine) {
  const [name, value] = headerLine.split(':', 2);
  return { name: name.trim().toLowerCase(), value: value.trim() };
}

function parseHeaderLines(headerLines) {
  const headers = {};
  for (const headerLine of headerLines) {
    const { name, value } = parseHeaderLine(headerLine);
    headers[name] = value;
  }
  return headers;
}

module.exports = {
  parseHeaderLines,
};
