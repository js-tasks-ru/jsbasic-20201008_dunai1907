/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  // ваш код...
  let newStr = str.charAt(0).toUpperCase() + str.slice(1);
  return newStr;
}
