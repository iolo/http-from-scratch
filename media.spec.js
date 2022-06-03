const { UNKNOWN, getMediaType } = require('./media');

describe('media', () => {
  describe('getMediaType', () => {
    it('should work', () => {
      expect(getMediaType('test.html')).toBe('text/html');
      expect(getMediaType('test.txt')).toBe('text/plain');
      expect(getMediaType('test.jpg')).toBe('image/jpeg');
      expect(getMediaType('test')).toBe(UNKNOWN);
      expect(getMediaType('test.unknown')).toBe(UNKNOWN);
      expect(getMediaType('.html')).toBe('text/html');
      expect(getMediaType('.txt')).toBe('text/plain');
      expect(getMediaType('.jpg')).toBe('image/jpeg');
      expect(getMediaType('')).toBe(UNKNOWN);
      expect(getMediaType('.unknown')).toBe(UNKNOWN);
    });
  });
});
