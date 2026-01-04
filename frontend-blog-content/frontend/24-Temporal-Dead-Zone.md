# Temporal Dead Zone (TDZ) in JavaScript

## Overview
The Temporal Dead Zone (TDZ) is the period between entering a scope and the variable declaration where variables cannot be accessed. This affects `let` and `const` declarations but not `var`.

## Basic Concept

```javascript
// TDZ for 'age' starts here
console.log(showAge); // undefined (var is hoisted)
// console.log(age); // ReferenceError (let is in TDZ)
// console.log(constAge); // ReferenceError (const is in TDZ)

let age = 1;          // TDZ ends here for 'age'
var showAge = 2;      // No TDZ for var
const constAge = 5;   // TDZ ends here for 'constAge'
```

## TDZ with let and const

```javascript
// ReferenceError: Cannot access 'x' before initialization
console.log(x); // TDZ - error occurs here
let x = 10;

// ReferenceError: Cannot access 'y' before initialization
console.log(y); // TDZ - error occurs here
const y = 20;
```

## var vs let/const

```javascript
// var - hoisted and initialized with undefined
console.log(a); // undefined (no error)
var a = 5;

// let - hoisted but not initialized (TDZ)
// console.log(b); // ReferenceError
let b = 10;

// const - hoisted but not initialized (TDZ)
// console.log(c); // ReferenceError
const c = 15;
```

## Block Scope and TDZ

```javascript
{
  var blockVar = 1;     // Function scoped, no TDZ
  const blockConst = 2; // Block scoped, TDZ applies
  let blockLet = 3;     // Block scoped, TDZ applies

  console.log(blockVar);  // 1
  console.log(blockConst); // 2
  console.log(blockLet);   // 3
}

console.log(blockVar);     // 1 (accessible)
// console.log(blockConst); // ReferenceError (not accessible)
// console.log(blockLet);   // ReferenceError (not accessible)
```

## Variable Shadowing

```javascript
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
```

## TDZ in Functions

```javascript
function example() {
  // TDZ starts
  // console.log(value); // ReferenceError
  
  let value = 10; // TDZ ends
  console.log(value); // 10
}

example();
```

## TDZ with Default Parameters

```javascript
function example(a = b, b = 2) {
  return a + b;
}

// console.log(example()); // ReferenceError
// 'b' is in TDZ when 'a' default is evaluated

// Correct order
function example2(a = 2, b = a) {
  return a + b;
}

console.log(example2()); // 4 (works)
```

## TDZ in Loops

```javascript
// TDZ in for loop
for (let i = 0; i < 3; i++) {
  // Each iteration has its own 'i' binding
  setTimeout(() => {
    console.log(i); // 0, 1, 2 (works correctly)
  }, 100);
}

// var in for loop (no TDZ, but different behavior)
for (var j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log(j); // 3, 3, 3 (all same value)
  }, 100);
}
```

## Why TDZ Exists

1. **Catch errors early**: Prevents accessing variables before initialization
2. **Prevent confusion**: Makes it clear when variables are available
3. **Better semantics**: Aligns with block scoping behavior

## Common Mistakes

```javascript
// Mistake 1: Accessing before declaration
function badExample() {
  console.log(x); // ReferenceError
  let x = 5;
}

// Mistake 2: Using in default parameters
function badExample2(x = y, y = 10) {
  return x + y; // ReferenceError: y is in TDZ
}

// Correct: Declare before use
function goodExample() {
  let x = 5;
  console.log(x); // 5
}
```

## Key Points
- TDZ exists for `let` and `const`, not `var`
- Period between scope entry and variable declaration
- Accessing variables in TDZ throws `ReferenceError`
- Helps catch bugs early and prevents confusion
- Each block scope has its own TDZ
- Always declare variables before using them

