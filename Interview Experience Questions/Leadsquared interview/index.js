// const a = {};
// const b = { ...a };
// console.log(a == b); // false
// console.log(a === b); // false  to make it true try JSON.stringify
/** 
 Primitives like strings and numbers are compared by their value, 
 while objects like arrays, dates, and plain objects are compared by their reference. 
 That comparison by reference basically checks to see if the objects given refer 
 to the same location in memory, which they do not, so the comparison is false.
 */

// console.log(1 + 1 + "");   // 2  (first 2 No. are number and then gets converted to string)
// console.log(1 + true);  // 2    (true means 1)
// console.log(null + undefined); // NaN

/** since null/undefined is type is not comparable to type 0 or 1 */
// console.log(undefined == false);  //false
// console.log(undefined == true);  //false
// console.log(null == true);  //false
// console.log(null == false);  //false

// console.log(!null); //true
// console.log(!undefined); //true

// console.log(undefined == null); //true
// console.log(undefined === null); //false (since 1st is type undefined 2nd one object)

// console.log(null + null); // 0
// console.log(undefined + undefined); // NaN

// null is considered to be 0 in arithmatic operations
// undefined is considered to be NaN in arithmatic operations

// convert the given funcList([f,g,h,i,j])(x) function into below function f(g(h(i(j(x))))
// Solution
// function composeFunctions(funcs) {
//   return function (x) {
//     return funcs.reduceRight((acc, func) => func(acc), x);
//   };
// }

// --------------------------------------------------------------------------------------------

//closures more details info required
// function outer() {
//   var a = 1;
//   function inner() {
//     console.log(a);
//   }
//   a = 10;
//   inner();
// }

//## diff b/w them
//## func.call(context,a,b)
//## func.bind(context,a,b)
//## func.apply(context,[])

//## os().add().sub().sub().add().mul();
//## ops
//## add
//## sub
//## add
//## mul

// chaining in js (how to implement it,polyfill)
// function method(){
//    function ops(){
//        return this;
//    }
//    function mul(){
//        return this;
//     }
//    function sub(){
//        return this;
//     }
//    function add(){
//        return this;
//     }
// }

// https://leetcode.com/problems/candy/

// function func(){
//     console.log(a)
// check();
// function check(){​​​​​​
//     console.log(a);
// }​​​​​​
// var a = 2;
// check();
// }
// console.log(func());
// Output:
// undefined
// undefined
// 2

//     function check(){​​​​​​
//     // for(let i=0; i < 5; i++){​​​​​​
//     //     setTimeout(() => {​​​​​​
//     //       console.log(i)
//     //     }​​​​​​,100)
//     // }​​​​​​
// }​​​​​​

//     function check(){​​​​​​
//     for(const i=0; i < 5; i++){​​​​​​
//         setTimeout(() => {​​​​​​
//           console.log(i)
//         }​​​​​​,100)
//     }​​​​​​
// }​​​​​​
