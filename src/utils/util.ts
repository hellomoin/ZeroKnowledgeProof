/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method generateRandomNumber
 * @param {Number}
 * @returns {number} 
 * @description this returns a random number between specified range.
 */
export const rand = (min: number, max: number) : number =>  {
  return Math.floor(Math.random() * (max - min) + min);
};

const isPrime = (num: number) : boolean => {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++)
      if(num % i === 0) return false; 
  return num > 1;
}

export const getPrime = (min: number, max: number) => {
  const x = rand(min, max);
  if(isPrime(x)) return x;
  else return getPrime(min, max);
}