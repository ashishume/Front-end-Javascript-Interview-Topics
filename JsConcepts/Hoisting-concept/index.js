// Example 1: var hoisting
console.log(a); // undefined
a = "Ashish";
var a;

// Example 2: Function hoisting
console.log(func()); // 10
const func = function () {
  return 10;
};

// Example 3: let hoisting
b = "Dev"; // ReferenceError: Cannot access 'b' before initialization
let b;

/**
 * Hoisting Behavior in JavaScript:
 *
 * 1. var declarations:
 *    - Hoisted to top of scope
 *    - Initialized with undefined
 *    - Can be accessed before declaration
 *
 * 2. let/const declarations:
 *    - Hoisted but not initialized
 *    - Cannot be accessed before declaration
 *    - Results in ReferenceError if accessed early
 *
 * 3. Function declarations:
 *    - Fully hoisted (declaration + definition)
 *    - Can be called before declaration
 *
 * 4. Function expressions:
 *    - Follow variable hoisting rules
 *    - Cannot be called before declaration
 *
 * Note: Hoisting is a compile-time behavior where declarations are processed
 * before code execution, but the actual code remains in place.
 */
