const {
  isInformational,
  isSuccessful,
  isRedirection,
  isClientError,
  isServerError,
  getReasonPhase,
} = require('./status');

describe('status', () => {
  describe('isInformational', () => {
    it('should work', () => {
      expect(isInformational(99)).toBeFalsy();
      expect(isInformational(100)).toBeTruthy();
      expect(isInformational(199)).toBeTruthy();
      expect(isInformational(200)).toBeFalsy();
      expect(isInformational(9099)).toBeFalsy();
      expect(isInformational(9100)).toBeTruthy();
      expect(isInformational(9199)).toBeTruthy();
      expect(isInformational(9200)).toBeFalsy();
    });
  });
  describe('isSuccessful', () => {
    it('should work', () => {
      expect(isSuccessful(199)).toBeFalsy();
      expect(isSuccessful(200)).toBeTruthy();
      expect(isSuccessful(299)).toBeTruthy();
      expect(isSuccessful(300)).toBeFalsy();
      expect(isSuccessful(9199)).toBeFalsy();
      expect(isSuccessful(9200)).toBeTruthy();
      expect(isSuccessful(9299)).toBeTruthy();
      expect(isSuccessful(9300)).toBeFalsy();
    });
  });
  describe('isRedirection', () => {
    it('should work', () => {
      expect(isRedirection(299)).toBeFalsy();
      expect(isRedirection(300)).toBeTruthy();
      expect(isRedirection(399)).toBeTruthy();
      expect(isRedirection(400)).toBeFalsy();
      expect(isRedirection(9299)).toBeFalsy();
      expect(isRedirection(9300)).toBeTruthy();
      expect(isRedirection(9399)).toBeTruthy();
      expect(isRedirection(9400)).toBeFalsy();
    });
  });
  describe('isClientError', () => {
    it('should work', () => {
      expect(isClientError(399)).toBeFalsy();
      expect(isClientError(400)).toBeTruthy();
      expect(isClientError(499)).toBeTruthy();
      expect(isClientError(500)).toBeFalsy();
      expect(isClientError(9399)).toBeFalsy();
      expect(isClientError(9400)).toBeTruthy();
      expect(isClientError(9499)).toBeTruthy();
      expect(isClientError(9500)).toBeFalsy();
    });
  });
  describe('isServerError', () => {
    it('should work', () => {
      expect(isServerError(499)).toBeFalsy();
      expect(isServerError(500)).toBeTruthy();
      expect(isServerError(599)).toBeTruthy();
      expect(isServerError(600)).toBeFalsy();
      expect(isServerError(9499)).toBeFalsy();
      expect(isServerError(9500)).toBeTruthy();
      expect(isServerError(9599)).toBeTruthy();
      expect(isServerError(9600)).toBeFalsy();
    });
  });
});
