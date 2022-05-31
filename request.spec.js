const { parseRequest } = require('./request');

describe('request', () => {
  describe('parseRequest', () => {
    it('should parse', () => {
      const TEST_DATA = 'GET / HTTP/1.1\r\nHost: HOST\r\nContent-Type: application/json\r\n\r\nBODY';
      expect(parseRequest(TEST_DATA)).toEqual({
        method: 'GET',
        requestUri: '/',
        httpVersion: 'HTTP/1.1',
        headers: { host: 'HOST', 'content-type': 'application/json' },
        body: 'BODY',
        _raw: TEST_DATA,
      });
    });
  });
});
