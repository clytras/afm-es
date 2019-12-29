const { generateValidAFM, validateAFM } = require('../dist/index.cjs');

console.log('(default)', generateValidAFM());
console.log('pre99', generateValidAFM({ pre99: true }));
console.log('legalEntity', generateValidAFM({ legalEntity: true }));
console.log('individual', generateValidAFM({ individual: true }));
console.log('repeatTolerance:0', generateValidAFM({ repeatTolerance: 0 }));
