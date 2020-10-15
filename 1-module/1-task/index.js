/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  // ваш код...
  let result = 1;
  for (let i = n; i >= 1; i--){
  	result*=i;
  }
  return result;
}
