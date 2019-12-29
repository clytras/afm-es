export function getRandomInt(min, max, notEqual = null) {
  let result;

  min = Math.ceil(min);
  max = Math.floor(max);

  do {
    result = Math.floor(Math.random() * (max - min)) + min;
  } while(notEqual !== null && result === notEqual)
  
  return  result;
}
