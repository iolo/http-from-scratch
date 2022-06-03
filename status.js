// https://datatracker.ietf.org/doc/html/rfc2616#section-10
const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const UNKNOWN = INTERNAL_SERVER_ERROR;

function isInformational(statusCode) {
  //return stautsCode >= 100 && statusCode < 200;
  return /1[0-9][0-9]$/.test(statusCode);
}

function isSuccessful(statusCode) {
  //return stautsCode >= 200 && statusCode < 300;
  return /2[0-9][0-9]$/.test(statusCode);
}

function isRedirection(statusCode) {
  //return stautsCode >= 300 && statusCode < 400;
  return /3[0-9][0-9]$/.test(statusCode);
}

function isClientError(statusCode) {
  //return stautsCode >= 400 && statusCode < 500;
  return /4[0-9][0-9]$/.test(statusCode);
}

function isServerError(statusCode) {
  //return stautsCode >= 500 && statusCode < 600;
  return /5[0-9][0-9]$/.test(statusCode);
}

//
//
//

const REASON_PHASES = {
  OK: 'OK',
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

const UNKNOWN_REASON = 'UNKNOWN';

function getReasonPhase(statusCode) {
  return REASON_PHASES[statusCode] ?? UNKNOWN_REASON;
}

module.exports = {
  isInformational,
  isSuccessful,
  isRedirection,
  isClientError,
  isServerError,
  getReasonPhase,
};
