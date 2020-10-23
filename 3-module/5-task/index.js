/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
    let str1 = str
    .split(" ")
    .join(",")
    .split(",")
    .filter( item => item!=="" && isFinite(item))
    .sort( (a, b) => a +b)
    .map(string => +string)
  
    return {
  min: Math.min(...str1),
  max: Math.max(...str1),
  }

}
