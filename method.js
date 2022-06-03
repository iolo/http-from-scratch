// https://datatracker.ietf.org/doc/html/rfc2616#section-9

const GET = 'GET';
const HEAD = 'HEAD';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
// not yet supported!
//const CONNECT = 'CONNECT';
//const OPTIONS = 'OPTIONS';
//const TRACE = 'TRACE';
//const PATCH = 'PATCH';
const METHODS = [GET, HEAD, POST, PUT, DELETE];

function isValidMethod(method) {
  return METHODS.includes(method?.toUpperCase());
}

module.exports = {
  GET,
  HEAD,
  POST,
  PUT,
  DELETE,
  METHODS,
  isValidMethod,
};
