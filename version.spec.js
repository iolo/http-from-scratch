const { VERSIONS, isValidVersion } = require('./version');

describe('version', () => {
  describe('isValidVersion', () => {
    it('should work', () => {
      for (const version of VERSIONS) {
        expect(isValidVersion(version)).toBeTruthy();
        expect(isValidVersion(version.toLowerCase())).toBeFalsy(); // case-sensitive
      }
      expect(isValidVersion()).toBeFalsy();
      expect(isValidVersion(null)).toBeFalsy();
      expect(isValidVersion('')).toBeFalsy();
      expect(isValidVersion('INVALID')).toBeFalsy();
    });
  });
});
