const {
  validateAFM,
  generateAFM,
  generateValidAFM,
  generateInvalidAFM
} = require('../src');

const { getRandomInt } = require('../src/utils');

const iterations = 100;
const calls = {
  valid: {
    functions: [{
      fn: generateAFM,
      params: {}
    }, {
      fn: generateValidAFM,
      params: {}
    }],
    expectResult: true
  },
  invalid: {
    functions: [{
      fn: generateAFM,
      params: { valid: false }
    }, {
      fn: generateInvalidAFM,
      params: {}
    }],
    expectResult: false
  }
}

describe('Random integer', () => {
  it('should generate integers between 0 and 9', () => {
    for(let i = 0; i < iterations; i++) {
      const value = getRandomInt(0, 9);
      expect(value).toBeWithin(0, 10); // toBeWithin end is exclusive
    }
  });

  it('should generate integers between 0 and 9 excluding specific digits', () => {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let i = 0; i < iterations; i++) {
      for(let digit = 0; digit < digits.length; digit++) {
        const notEqual = digits[digit];
        const value = getRandomInt(0, 9, notEqual);
        expect(value).not.toBe(notEqual);
        expect(value).toBeWithin(0, 10); // toBeWithin end is exclusive
      }
    }
  });
});

describe('Generators', () => {
  function testDefault(call) {
    return () => {
      const { expectResult, functions } = calls[call];
      for(let i = 0; i < iterations; i++) {
        for(let { fn, params } of functions) {
          const value = fn(params);
          const valid = validateAFM(value);
          expect(valid).toBe(expectResult);
        }
      }
    }
  }

  function testForceFirstDigit(call) {
    return () => {
      const { expectResult, functions } = calls[call];
      const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for(let i = 0; i < iterations; i++) {
        for(let forceFirstDigit of digits) {
          for(let { fn, params } of functions) {
            const value = fn({ ...params, forceFirstDigit });
            const valid = validateAFM(value);
            expect(valid).toBe(expectResult);
            const firstDigit = value[0];
            expect(firstDigit).toBe(forceFirstDigit.toString());
          }
        }
      }
    }
  }

  function testPre99(call) {
    return () => {
      const { expectResult, functions } = calls[call];
      for(let i = 0; i < iterations; i++) {
        for(let { fn, params } of functions) {
          const value = fn({ ...params, pre99: true });
          const valid = validateAFM(value);
          expect(valid).toBe(expectResult);
          const firstDigit = value[0];
          expect(firstDigit).toBe('0');
        }
      }
    }
  }

  function testIndividual(call) {
    return () => {
      const { expectResult, functions } = calls[call];
      for(let i = 0; i < iterations; i++) {
        for(let { fn, params } of functions) {
          const value = fn({ ...params, individual: true });
          const valid = validateAFM(value);
          expect(valid).toBe(expectResult);
          const firstDigit = value[0];
          expect(firstDigit).toMatch(/^[1-4]{1}$/);
        }
      }
    }
  }

  function testLegalEntity(call) {
    return () => {
      const { expectResult, functions } = calls[call];
      for(let i = 0; i < iterations; i++) {
        for(let { fn, params } of functions) {
          const value = fn({ ...params, legalEntity: true });
          const valid = validateAFM(value);
          expect(valid).toBe(expectResult);
          const firstDigit = value[0];
          expect(firstDigit).toMatch(/^[7-9]{1}$/);
        }
      }
    }
  }

  function testRepeatTolerance(call) {
    return () => {
      const { expectResult, functions } = calls[call];
      for(let i = 0; i < iterations; i++) {
        for(let { fn, params } of functions) {
          const repeatTolerance0 = fn({ ...params, repeatTolerance: 0 });
          const valid = validateAFM(repeatTolerance0);
          expect(valid).toBe(expectResult);
          const re = /(.)\1+/g;
          const test0 = repeatTolerance0.substring(0, 8).match(re);
          expect(test0).toBeNull();

          for(let repeatTolerance = 1; repeatTolerance <= 3; repeatTolerance++) {
            const repeatToleranceN = fn({ ...params, repeatTolerance });
            const valid = validateAFM(repeatToleranceN);
            expect(valid).toBe(expectResult);
            const testN = repeatToleranceN.substring(0, 8).match(re);
            if(testN && testN.length) {
              for(let repeats of testN) {
                expect(repeats.length <= (repeatTolerance + 1)).toBeTruthy();
              }
            }
          }
        }
      }
    }
  }

  Object.entries({
    '(default)': testDefault,
    forceFirstDigit: testForceFirstDigit,
    pre99: testPre99,
    individual: testIndividual,
    legalEntity: testLegalEntity,
    repeatTolerance: testRepeatTolerance
  })
  .forEach(([name, fn]) => 
    ['valid', 'invalid']
    .forEach(type => 
      it(`${type.padEnd(7)}: ${name}`, fn(type))
    )
  );
});
