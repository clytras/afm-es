
const { validateAFM } = require('../src');

const StaticValidNumbers = [
  '090000045', // DEI
  '094019245', // OTE
  '094079101', // EYDAP
];

describe('Validation', () => {
  it('should validate valid AFM numbers', () => {
    for(const afm of StaticValidNumbers) {
      const valid = validateAFM(afm);
      expect(valid).toBe(true);
    }
  });

  it('should validate an invalid AFM', () => {
    const invalid = validateAFM('123456789');
    expect(invalid).toBe(false);
  });
});
