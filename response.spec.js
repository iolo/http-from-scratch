const { parseResponse } = require('./response');

describe('response', () => {
  describe('parseResponse', () => {
    it('should parse', () => {
      const TEST_DATA = 'HTTP/1.1 200 OK\r\nHost: HOST\r\nContent-Type: application/json\r\n\r\nBODY';
      expect(parseResponse(TEST_DATA)).toEqual({
        httpVersion: 'HTTP/1.1',
        statusCode: '200',
        reasonPhase: 'OK',
        headers: { host: 'HOST', 'content-type': 'application/json' },
        body: 'BODY',
        _raw: TEST_DATA,
      });
    });
  });
});
