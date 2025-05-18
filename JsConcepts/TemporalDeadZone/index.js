/**
 * Temporal Dead Zone (TDZ) Demonstration
 *
 * TDZ is the period between entering scope and variable declaration where variables
 * cannot be accessed. This affects let and const declarations.
 */

// Example 1: TDZ with different variable declarations
console.log(showAge); // undefined (var is hoisted)
// console.log(age); // ReferenceError (let is in TDZ)
// console.log(constAge); // ReferenceError (const is in TDZ)

let age = 1;
var showAge = 2;
const constAge = 5;

// Example 2: Block scope demonstration
{
  var blockVar = 1; // Function scoped
  const blockConst = 2; // Block scoped
  let blockLet = 3; // Block scoped

  console.log(blockVar); // 1
  console.log(blockConst); // 2
  console.log(blockLet); // 3
}

console.log(blockVar); // 1 (accessible outside block)
// console.log(blockConst); // ReferenceError (not accessible)
// console.log(blockLet);  // ReferenceError (not accessible)

// Example 3: Variable shadowing
const globalA = 20;
{
  const globalA = 100; // Shadows outer scope
  {
    const globalA = 200; // Shadows middle scope
    {
      const globalA = 400; // Shadows inner scope
      console.log(globalA); // 400 (innermost scope)
    }
  }
}
