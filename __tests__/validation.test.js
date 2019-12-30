
const { validateAFM } = require('../src');

const StaticValidNumbers = [
  '090000045', // DEI
  '094019245', // OTE
  '094079101', // EYDAP
];

const StaticInvalidNumbers = [
  '123456789',
  '097364585',
  '150663780'
];

const InvalidErrors = {
  length: '09000004',
  nan: '09000004A',
  zero: '000000000',
  invalid: '123456789'
}

describe('Validation', () => {
  it('should validate valid AFM numbers', () => {
    for(const afm of StaticValidNumbers) {
      const result = validateAFM(afm);
      expect(result).toBeTrue();
    }
  });

  it('should invalidate invalid AFM numbers', () => {
    for(const afm of StaticInvalidNumbers) {
      const result = validateAFM(afm);
      expect(result).toBeFalse();
    }
  });

  Object.entries(InvalidErrors).forEach(([error, value]) => {
    it(`should invalidate "${error}" error`, () => {
      const result = validateAFM(value);
      expect(result).toBeFalse();
    });
  });
});

describe('Validation with extendedResult', () => {
  it('should validate valid AFM numbers', () => {
    for(const afm of StaticValidNumbers) {
      const result = validateAFM(afm, { extendedResult: true });
      expect(result).toBeObject();
      expect(result).toContainKey('valid');
      expect(result).not.toContainKey('error');
      expect(result.valid).toBeTrue();
    }
  });

  it('should invalidate invalid AFM numbers', () => {
    for(const afm of StaticInvalidNumbers) {
      const result = validateAFM(afm, { extendedResult: true });
      expect(result).toBeObject();
      expect(result).toContainKeys(['valid', 'error']);
      expect(result.valid).toBeFalse();
      expect(result.error).toBe('invalid');
    }
  });

  Object.entries(InvalidErrors).forEach(([error, value]) => {
    it(`should invalidate "${error}" error`, () => {
      const result = validateAFM(value, { extendedResult: true });
      expect(result).toBeObject();
      expect(result).toContainKeys(['valid', 'error']);
      expect(result.valid).toBeFalse();
      expect(result.error).toBe(error);
    });
  });
});
