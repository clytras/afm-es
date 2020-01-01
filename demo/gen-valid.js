const { generateValidAFM, validateAFM } = require('../dist/index.cjs');

Object.entries({
  '(default)': {},
  'pre99': { pre99: true },
  'legalEntity': { legalEntity: true },
  'individual': { individual: true },
  'repeatTolerance:0': { repeatTolerance: 0 }
})
.forEach(([type, params]) => {
  const afm = generateValidAFM(params);
  console.log(type, afm, validateAFM(afm) ? '(valid)' : '(invalid)');
});
