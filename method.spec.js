const { METHODS, isValidMethod } = require('./method');

describe('method', () => {
  describe('isValidMethod', () => {
    it('should work', () => {
      for (const method of METHODS) {
        expect(isValidMethod(method)).toBeTruthy();
        expect(isValidMethod(method.toLowerCase())).toBeTruthy();
      }
      expect(isValidMethod()).toBeFalsy();
      expect(isValidMethod(null)).toBeFalsy();
      expect(isValidMethod('')).toBeFalsy();
      expect(isValidMethod('INVALID')).toBeFalsy();
    });
  });
});
