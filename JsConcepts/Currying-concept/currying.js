//Follow this link: https://theanubhav.com/2019/02/03/js-currying-in-interview/


/** below functions handles unlimited arguments using recursion */
function sum(a) {
  return function (b) {
    if (b) return sum(a + b);
    return a;
  };
}
const a = sum(1)(2)(3)(4)(5)(6);
console.log(a()); //21  // with extra ()


// ---------------------------------------------------
function sumWithoutExtraBraces(a) {
  function sum(b) {
    a += b;
    return sum;
  }

  //Every object have a primitive value ,
  //valueOf converts the 'object' to its 'primitive' value.
  //we are assigning 'a' as it's primitive value.
  sum.valueOf = function () {
    return a;
  };
  return sum;
}
// 'urinary' operator coerced to it's primtive value
console.log(+sumWithoutExtraBraces(1)(2)(3)(4)(5)(6)); //21 // without extra ()

//-----------------------------------------------------------------------------------------

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
console.log(addSub(1, 2)(3)(4, 5, 6)(7, 9)()); //37  //with extra param

//--------------------------------------------------------------------------------------------

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
console.log(totalSum(1)(2)(3)(4)); //10  //without extra but passed function pas 1st param
