const { generateInvalidAFM, validateAFM } = require('../dist/index.cjs');

console.log('(default)', generateInvalidAFM());
console.log('pre99', generateInvalidAFM({ pre99: true }));
console.log('legalEntity', generateInvalidAFM({ legalEntity: true }));
console.log('individual', generateInvalidAFM({ individual: true }));
console.log('repeatTolerance:0', generateInvalidAFM({ repeatTolerance: 0 }));
