const { getMimeType } = require('./mime');

describe('mime', () => {
  describe('getMimeType', () => {
    it('should work', () => {
      expect(getMimeType('test.html')).toBe('text/html');
      expect(getMimeType('test.txt')).toBe('text/plain');
      expect(getMimeType('test.jpg')).toBe('image/jpeg');
      expect(getMimeType('test')).toBe('application/octet-stream');
      expect(getMimeType('test.unknown')).toBe('application/octet-stream');
      expect(getMimeType('test.bin')).toBe('application/octet-stream');
    });
  });
});
