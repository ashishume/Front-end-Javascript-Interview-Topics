/**
 * Implement a function onlyTwice which stores two instances a function invocation
 * and returns first on odd calls and second on even calls in js
 */
const onlyTwice = (fn) => {
  let isOdd = true;
  let first = null;
  let second = null;

  return function (...args) {
    if (isOdd) {
      if (!first) {
        first = fn(...args);
      }

      isOdd = false;
      return first;
    } else {
      if (!second) {
        second = fn(...args);
      }

      isOdd = true;
      return second;
    }
  };
};
const addTwoNumbers = (a, b) => a + b;
const myFancyAdd = onlyTwice(addTwoNumbers);

console.log(myFancyAdd(2, 3)); // 5
console.log(myFancyAdd(1, 2)); // 3
console.log(myFancyAdd(3, 4)); // 5
console.log(myFancyAdd(3, 7)); // 3
