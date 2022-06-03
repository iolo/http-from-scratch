const path = require('path');

// media types
const APPLICATION_JS = 'application/js';
const APPLICATION_JSON = 'application/json';
const APPLICATION_OCTET_STREAM = 'application/octet-stream';
const IMAGE_GIF = 'image/gif';
const IMAGE_JPEG = 'image/jpeg';
const IMAGE_PNG = 'image/png';
const TEXT_CSS = 'text/css';
const TEXT_HTML = 'text/html';
const TEXT_PLAIN = 'text/plain';

// alias
const HTML = TEXT_HTML;
const TEXT = TEXT_PLAIN;
const JPEG = IMAGE_JPEG;
const JPG = IMAGE_JPEG;
const PNG = IMAGE_PNG;
const GIF = IMAGE_GIF;
const JS = APPLICATION_JS;
const JAVASCRIPT = APPLICATION_JS;
const JSON = APPLICATION_JSON;
const CSS = TEXT_CSS;
const BINARY = APPLICATION_OCTET_STREAM;
const UNKNOWN = APPLICATION_OCTET_STREAM;

// additional media types
const APPLICATION_X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded';
const HTML_FORM_POST = APPLICATION_X_WWW_FORM_URLENCODED;
const MULTIPART_FORM_DATA = 'multipart/form-data';
const HTML_FORM_UPLOAD = MULTIPART_FORM_DATA;

const MEDIA_TYPES = {
  '.html': HTML,
  '.htm': HTML,
  '.txt': TEXT,
  '.text': TEXT,
  '.jpg': JPG,
  '.jpeg': JPEG,
  '.png': PNG,
  '.gif': GIF,
  '.js': JS,
  '.css': CSS,
};


function getMediaType(name) {
  const ext = name.substring(name.lastIndexOf('.'))?.toLowerCase();
  //const ext = path.extname(name ?? '').toLowerCase();
  return MEDIA_TYPES[ext] ?? UNKNOWN;
}

module.exports = {
  //
  APPLICATION_JS,
  APPLICATION_JSON,
  APPLICATION_OCTET_STREAM,
  IMAGE_GIF,
  IMAGE_JPEG,
  IMAGE_PNG,
  TEXT_CSS,
  TEXT_HTML,
  TEXT_PLAIN,
  //
  HTML,
  TEXT,
  JPEG,
  JPG,
  PNG,
  GIF,
  JS,
  JAVASCRIPT,
  JSON,
  CSS,
  BINARY,
  UNKNOWN,
  //
  APPLICATION_X_WWW_FORM_URLENCODED,
  HTML_FORM_POST,
  MULTIPART_FORM_DATA,
  HTML_FORM_UPLOAD,
  //
  MEDIA_TYPES,
  getMediaType,
};
