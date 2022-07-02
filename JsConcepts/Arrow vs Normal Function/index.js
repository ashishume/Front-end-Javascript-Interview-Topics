const arr = [1, 5, 6, 7, 8];
delete arr[1]; //here "delete" removes the value and key but while printing key doesnt show up.
//result==>  arr[0]  "empty"  arr[2] arr[3] arr[4]
// console.log(arr);
// }

var a = 100;
function NormalFunc(a, b) {
  console.log(this.a); //for normal function this.a prints Ashish
  console.log(arguments[0]); //works here
}
const ArrowFunc = (...args) => {
  console.log(this.a); //for arrow function this.a still prints 100 (even though we have passed context)

  console.log(...args);
  //duplicate named not allowed in arrow function
  //   console.log(this.arguments[0]); //error
};

// const ar1 = [1, 2];
// const ar2 = ["a", "b"];

// console.log([...ar1, ...ar2]);

/*

Normal function => 
1. new keyword can be used to call the functions
2. "arguments" work in normal function
3. they have their own "this"

Arrow function => 
1. new keyword cannot be used to call the functions
2. "arguments" doesnt work in normal function instead ...args can be used to access the arguments
3. they dont have their own "this", i.e. even if we pass the context, it will show the global 'this'
*/

// NormalFunc.call({ a: "Ashish" }, 81, 82);
// ArrowFunc.call({ a: "Debnath" }, 85, 86); /** arrow function doesnt have its own context */

/**
 * 
 * Difference between Function constructor and function declaration?
Functions created with the Function constructor do not create closures to their 
creation contexts; they always are created in the global scope. When running them, 
they will only be able to access their own local variables and global ones, not 
the ones from the scope in which the Function constructor was created
 */

const x = 10;
function createFunction1() {
  const x = 20;
  return new Function("return x;"); // this |x| refers global |x|
}
function createFunction2() {
  const x = 20;
  function f() {
    return x; // this |x| refers local |x| above
  }
  return f;
}
const f1 = createFunction1();
console.log(f1()); // 10
const f2 = createFunction2();
console.log(f2()); // 20
