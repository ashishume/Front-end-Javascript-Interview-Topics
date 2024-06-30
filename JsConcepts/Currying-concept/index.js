//Follow this link: https://theanubhav.com/2019/02/03/js-currying-in-interview/

//-----------------------------------------------------------------------------------------------
/** this method takes max 4 (can be changed) arguments to execute the methods without extra ()  */
const MAX_ARGS = 4;
const sumCurry = (...args) => {
  //spread the arguments in storage array
  const storage = [...args];
  
  //base case
  //if we have reached the limit
  if(storage.length === MAX_ARGS){
    return storage.reduce((a, b) => a + b, 0);
  }
  //other wise return a function
  else{
     //create an inner function
     const temp = function(...args2){
      //get the arguments of inner function
      //merge them in existing storage
      storage.push(...args2);

      //if we have reached the limit 
      //return the value
      if(storage.length === MAX_ARGS){
         return storage.reduce((a, b) => a + b, 0);
      }
      //else return the same function again
      else{
         return temp;
      }
    }
    
    //return the function
    return temp;
  }
}
// Input:
// below methods works only mentioned args (more or less will return function)
const res = sumCurry(1, 2, 3, 4);
const res2 = sumCurry(1)(2)(3)(4);
const res3 = sumCurry(1, 2)(3, 4);
const res4 = sumCurry(1, 2, 3)(4);
const res5 = sumCurry(1)(2, 3, 4);

console.log(res, res2, res3, res4, res5);

// Output:
// 10 10 10 10 10

//---------------------------------------------------------------------------------------

// this func takes max 2 args at one time without braces
function addWithoutExtraParams(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return (arg) =>
      arg === undefined
        ? curried.apply(this, args)
        : curried.apply(this, [...args, arg]);
  };
}
function add(a, b) {
  return a + b;
}

const curriedAdd = addWithoutExtraParams(add);
curriedAdd(3)(4); // 7

const alreadyAddedThree = curriedAdd(3);
console.log(alreadyAddedThree(4)); // 7

// ------------------------------------------------------------------------

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
