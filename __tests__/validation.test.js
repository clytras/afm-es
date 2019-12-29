
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

describe('Validation', () => {
  it('should validate valid AFM numbers', () => {
    for(const afm of StaticValidNumbers) {
      const valid = validateAFM(afm);
      expect(valid).toBe(true);
    }
  });

  it('should validate invalid AFM numbers', () => {
    for(const afm of StaticInvalidNumbers) {
      const valid = validateAFM(afm);
      expect(valid).toBe(false);
    }
  });
});
