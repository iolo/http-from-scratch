const path = require('path');

function getMimeType(name) {
  switch(path.extname(name).toLowerCase()) {
    case '.html':
      return 'text/html';
    case '.txt':
      return 'text/plain';
    case '.jpg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}

module.exports = {
  getMimeType,
}
