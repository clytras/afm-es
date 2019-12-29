const { generateValidAFM, validateAFM } = require('../dist/index.cjs');

console.log(generateValidAFM());
console.log(generateValidAFM({ pre99: true }));
console.log(generateValidAFM({ legalEntity: true }));
console.log(generateValidAFM({ individuals: true }));

for(let i = 0; i < 20; i++)
  console.log(generateValidAFM({ forceFirstDigit: 1, repeatTolerance: 0 }));

