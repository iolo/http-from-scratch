// https://datatracker.ietf.org/doc/html/rfc2616#section-2.2
const CR = '\r';
const LF = '\n';
const SP = ' ';
const HT = '\t';

const CRLF = CR + LF;
const LWS = /\r\n[ \t]/;
const SEPARATORS = ['(', ')', '<', '>', '@', ',', ';', ':', '\\', '\"', '/', '[', ']', '?', '=', '{', '}', SP, HT];

function isSeparators(c) {
  return SEPARATERS.includes(c);
}

module.exports = {
  CR,
  LF,
  SP,
  HT,
  CRLF,
};
