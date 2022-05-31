const URL_REGEX = /^((https?:)?\/\/(([^:]+):([^@]+)@)?(([a-zA-Z_\-\.]+)(:([0-9]+))?))?([^\?#]*)?(\?[^#]*)?(#.*)?$/;
//                  12             34       5         67               8 9            a         b         c
console.log(URL_REGEX.exec('https://user:pass@example.com:123/p/a/t/h?a=b&c=d#e=f&g=h'));
//[
// 0:'https://user:pass@example.com:123/p/a/t/h?a=b&c=d#e=f&g=h',
// 1:'https://user:pass@example.com:123',
// 2:'https:',
// 3:'user:pass@',
// 4:'user',
// 5:'pass',
// 6:'example.com:123',
// 7:'example.com',
// 8:':123',
// 9:'123',
// 10:'/p/a/t/h',
// 11:'?a=b&c=d',
// 12:'#e=f&g=h',
//]

function parseQueryString(s) {
  return s
    ?.replace(/^\?/, '')
    .split('&')
    ?.reduce((result, term) => {
      const [key, value = ''] = term.split('=', 2);
      result[decodeURIComponent(key)] = decodeURIComponent(value);
      return result;
    }, {});
}

function parseUrl(s) {
  const matches = URL_REGEX.exec(s);
  if (!matches) {
    throw new Error(`invalid url: ${s}`);
  }
  const [
    _all,
    _url,
    protocol,
    _authentication,
    username,
    password,
    host,
    hostname,
    _port,
    port,
    path,
    search,
    hash
  ] = matches;
  return {
    protocol,
    origin: (protocol && host) ? `${protocol}//${host}` : undefined,
    username,
    password,
    host,
    hostname,
    port,
    path,
    search,
    searchParams: parseQueryString(search),
    hash,
  };
}

module.exports = {
  parseQueryString,
  parseUrl,
};
