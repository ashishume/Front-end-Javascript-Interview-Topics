// what is currying?

// function curry(f) { // curry(f) does the currying transform
//   return function(a) {
//     return function(b) {
//       return f(a, b);
//     };
//   };
// }
// ------------------------------------------------------------------------------------------------------


/** below functions handles unlimited arguments using recursion */
function sum(a) {
  return function (b) {
    if (b) return sum(a + b);
    return a;
  };
}

const a = sum(1)(2)(3)(4)(5)(6);
// console.log(a());
// ------------------------------------------------------------------------------------------------------

/** convert func(a,b,c,d) to func(a)(b)(c)(d) also called perpertual currying  */
function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const sumValue = (a, b, c, d) => a + b + c + d;

const totalSum = curry(sumValue);
// console.log(totalSum(1)(2)(3)(4));

// ------------------------------------------------------------------------------------------------------
function addSub(...args) {
  let sum = 0;
  function curry(...innerArgs) {
    if (innerArgs.length === 0) return sum;
    sum += innerArgs.reduce((acc, num) => acc + num, 0);
    return curry;
  }
  return curry(...args);
}

// Create a currying function which adds all the numbers passed as arguments
console.log(addSub(1, 2)(3)(4, 5, 6)(7, 9)());
