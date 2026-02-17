/**
 * @description Group the array by the given function
 * @param {Function} fn
 * @returns {Object}
 */
Array.prototype.groupBy = function (fn) {
  const result = {};
  for (const item of this) {
    const key = fn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
};

console.log([1, 2, 3, 4, 5, 6].groupBy(String));
// {
//   "1": [1],
//   "2": [2],
//   "3": [3],
//   "4": [4],
//   "5": [5],
//   "6": [6]
// }

console.log([1, 2, 3, 4, 5, 6].groupBy((n) => n % 2));
// {
//   "0": [2,4,6],
//   "1": [1,3,5]
// }
