// function curry(f) { // curry(f) does the currying transform
//   return function(a) {
//     return function(b) {
//       return f(a, b);
//     };
//   };
// }

// // usage
// function sum(a, b) {
//   return a + b;
// }

// let curriedSum = curry(sum);

// alert( curriedSum(1)(2) ); // 3

/** below functions handles unlimited arguments using recursion */
function sum(a) {
  return function (b) {
    if (b) return sum(a + b);
    return a;
  };
}

const a = sum(1)(2)(3)(4)(5)(6);
// console.log(a());

/** convert func(a,b,c,d) to func(a)(b)(c)(d) */
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
