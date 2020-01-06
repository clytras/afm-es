import { getRandomInt } from './utils';

/**
 * @typedef {Object} ValidateAFMExtendedResult
 * @property {boolean} valid - Whether the AFM number is valid or not.
 * @property {('length'|'nan'|'zero'|'invalid')} error - The error result if the number is invalid.
 */

/**
 * Checks if the passed AFM is a valid AFM number
 * @param {string} afm - A string to be check if it's a valid AFM.
 * @param {Object} [arguments={}] - Function argumnets object. Empty object for all defaults.
 * @param {boolean} [arguments.extendedResult=false] - Return extended object result if true, single boolean otherwise.
 * @returns {boolean|ValidateAFMExtendedResult} - A boolean result or ValidateAFMExtendedResult indicating the validation of the number.
 */
export function validateAFM(afm, {
  extendedResult = false
} = {}) {
  if(afm.length != 9) {
    // "Τα ψηφία του ΑΦΜ πρέπει να είναι 9 αριθμοί"
    return extendedResult ? {
      valid: false,
      error: 'length'
    } : false;
  } 

  if(!/^\d+$/.test(afm)) {
    // "Αυτό που εισάγετε δεν είναι αριθμός"
    return extendedResult ? {
      valid: false,
      error: 'nan' // not a number
    } : false;
  }

  if(afm === '0'.repeat(9)) {
    // "Αυτό που εισάγετε είναι μηδενικός αριθμός (000000000)"
    return extendedResult ? {
      valid: false,
      error: 'zero'
    } : false;
  }

  const sum = afm
    .substring(0, 8)
    .split('')
    .reduce((s, v, i) => s + (parseInt(v) << (8 - i)), 0);
  
  const calc = sum % 11;
  const d9 = parseInt(afm[8]);
  const valid = calc % 10 === d9;

  if(extendedResult) {
    return valid ? { valid } : { valid, error: 'invalid' }
  }

  return valid;
}

/**
 * Generates an AFM number based on object parameters
 * @param {Object} [params={}] - Function parameters object. Empty object for all defaults.
 * @param {null|number} [params.forceFirstDigit] - If specified, overrides all pre99, legalEntity and individual.
 * @param {boolean} [params.pre99=false] - Για ΑΦΜ πριν από 1/1/1999 (ξεκινάει με 0), (if true, overrides both legalEntity and individual).
 * @param {boolean} [params.individual=false] - Φυσικά πρόσωπα, (ξεκινάει με 1-4)
 * @param {boolean} [params.legalEntity=false] - Νομικές οντότητες (ξεκινάει με 7-9)
 * @param {null|number} [params.repeatTolerance] - Number for max repeat tolerance (0 for no repeats, unspecified for no check)
 * @param {boolean} [params.valid=true] - Generate valid or invalid AFM
 * @returns {string} - A valid or invalid 9 digit AFM number
 */
export function generateAFM({
  forceFirstDigit,
  pre99 = false,
  individual = false,
  legalEntity = false,
  repeatTolerance,
  valid = true
} = {}) {
  const min = legalEntity ? 7 : 1;
  const max = individual ? 4 : 9;
  const repeatOf = !repeatTolerance && repeatTolerance !== 0 ? null : repeatTolerance;
  let digit = forceFirstDigit !== undefined && forceFirstDigit !== null && !isNaN(forceFirstDigit) ? 
    forceFirstDigit : 
    (pre99 ? 
      0 : 
      getRandomInt(min, max)
    );
  let lastGenDigit = digit;
  let repeats = 0;
  let body = digit.toString();
  let sum = digit * 0x100;

  for(let i = 7; i >= 1; i--) {
    digit = getRandomInt(0, 9, repeatOf !== null && repeats >= repeatOf ? lastGenDigit : null);
    body += digit.toString();
    sum += digit << i;
    if(digit === lastGenDigit) {
      repeats++;
    } else {
      repeats = 0;
    }
    lastGenDigit = digit;
  }

  const validator = sum % 11;
  const d9Valid = validator % 10;
  const d9 = valid ? d9Valid : getRandomInt(0, 9, d9Valid);

  return `${body}${d9}`;
}

/**
 * Generates a valid AFM number based on object parameters
 * @param {Object} [parameters={}] - Function parameters object. Empty object for all defaults.
 * @param {null|number} [params.forceFirstDigit] - If specified, overrides all pre99, legalEntity and individual.
 * @param {boolean} [params.pre99=false] - Για ΑΦΜ πριν από 1/1/1999 (ξεκινάει με 0), (if true, overrides both legalEntity and individual).
 * @param {boolean} [params.individual=false] - Φυσικά πρόσωπα, (ξεκινάει με 1-4)
 * @param {boolean} [params.legalEntity=false] - Νομικές οντότητες (ξεκινάει με 7-9)
 * @param {null|number} [params.repeatTolerance] - Number for max repeat tolerance (0 for no repeats, unspecified for no check)
 * @returns {string} - A valid 9 digit AFM number
 */
export function generateValidAFM(args = {}) {
  return generateAFM({ ...args, valid: true });
}

/**
 * Generates an invalid AFM number based on object parameters
 * @param {Object} [parameters={}] - Function parameters object. Empty object for all defaults.
 * @param {null|number} [params.forceFirstDigit] - If specified, overrides all pre99, legalEntity and individual.
 * @param {boolean} [params.pre99=false] - Για ΑΦΜ πριν από 1/1/1999 (ξεκινάει με 0), (if true, overrides both legalEntity and individual).
 * @param {boolean} [params.individual=false] - Φυσικά πρόσωπα, (ξεκινάει με 1-4)
 * @param {boolean} [params.legalEntity=false] - Νομικές οντότητες (ξεκινάει με 7-9)
 * @param {null|number} [params.repeatTolerance] - Number for max repeat tolerance (0 for no repeats, unspecified for no check)
 * @returns {string} - An invalid 9 digit AFM number
 */
export function generateInvalidAFM(args = {}) {
  return generateAFM({ ...args, valid: false });
}
