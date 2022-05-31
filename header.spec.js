const { parseHeaderLines } = require('./header');

describe('header', () => {
  describe('parseHeaderLines', () => {
    it('should parse', () => {
      const TEST_DATA = ['Host: HOST', 'Content-Type: application/json'];
      expect(parseHeaderLines(TEST_DATA)).toEqual({ host: 'HOST', 'content-type': 'application/json' });
    });
  });
});
