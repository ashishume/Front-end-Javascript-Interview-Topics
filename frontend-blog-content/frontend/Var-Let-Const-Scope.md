# Var, Let, and Const - Scope and Differences

## Overview
JavaScript provides three ways to declare variables: `var`, `let`, and `const`. Each has different scoping rules and behaviors.

## Scope Types

### Global Scope
Variables declared outside any function or block are globally scoped.

### Function Scope (Local Scope)
Variables declared inside a function are function-scoped.

### Block Scope
Variables declared inside a block `{}` are block-scoped.

## var

### Characteristics
- **Function-scoped** (or globally-scoped if declared outside function)
- Can be **redeclared** and **reassigned**
- **Hoisted** and initialized with `undefined`
- Available throughout the entire function (or globally)

### Example

```javascript
// Global scope
var globalVar = "I'm global";

function example() {
  // Function scope
  var functionVar = "I'm in function";
  
  if (true) {
    var blockVar = "I'm in block";
    // blockVar is accessible here
  }
  
  // blockVar is still accessible here (not block-scoped)
  console.log(blockVar); // "I'm in block"
}

// Can be redeclared
var globalVar = "I'm redeclared"; // No error
```

### Hoisting with var

```javascript
console.log(a); // undefined (not ReferenceError)
var a = 6;
```

**What happens:**
```javascript
var a; // hoisted, initialized as undefined
console.log(a); // undefined
a = 6;
```

### Problems with var

```javascript
// Problem 1: Can be redeclared (creates bugs)
var a = 10;
var a = 11; // No error, but can cause confusion

// Problem 2: Not block-scoped
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 3, 3, 3
}

// Problem 3: Hoisting can cause unexpected behavior
console.log(x); // undefined
var x = 5;
```

## let

### Characteristics
- **Block-scoped**
- Can be **reassigned** but **cannot be redeclared** in the same scope
- **Hoisted** but not initialized (Temporal Dead Zone)
- Only available within the block where it's declared

### Example

```javascript
function example() {
  let functionVar = "I'm in function";
  
  if (true) {
    let blockVar = "I'm in block";
    // blockVar is accessible here
    console.log(blockVar); // "I'm in block"
  }
  
  // blockVar is NOT accessible here (block-scoped)
  // console.log(blockVar); // ReferenceError
}

// Cannot be redeclared in same scope
let a = 10;
// let a = 11; // SyntaxError: Identifier 'a' has already been declared

// Can be reassigned
let b = 10;
b = 20; // OK
```

### Temporal Dead Zone (TDZ)

```javascript
// This will throw ReferenceError
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 6;

// This will also throw ReferenceError
console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 9;
```

### Block Scope Example

```javascript
// let is block-scoped - fixes the loop problem
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 0, 1, 2
}
```

## const

### Characteristics
- **Block-scoped**
- **Cannot be reassigned** or **redeclared**
- **Hoisted** but not initialized (Temporal Dead Zone)
- Must be **initialized** at declaration
- For objects/arrays: the reference cannot change, but properties/elements can be modified

### Example

```javascript
// Must be initialized
const PI = 3.14159;

// Cannot be reassigned
// PI = 3.14; // TypeError: Assignment to constant variable

// Cannot be redeclared
// const PI = 3.14; // SyntaxError

// Block-scoped
if (true) {
  const blockConst = "I'm in block";
}
// console.log(blockConst); // ReferenceError
```

### const with Objects and Arrays

```javascript
// The reference cannot change, but properties can
const person = {
  name: "John",
  age: 30
};

person.age = 31; // OK - modifying property
person.city = "NYC"; // OK - adding property
// person = {}; // TypeError: Assignment to constant variable

// Same with arrays
const numbers = [1, 2, 3];
numbers.push(4); // OK - modifying array
numbers[0] = 10; // OK - modifying element
// numbers = []; // TypeError: Assignment to constant variable
```

## Comparison Table

| Feature | var | let | const |
|---------|-----|-----|-------|
| **Scope** | Function/Global | Block | Block |
| **Hoisted** | Yes (initialized as `undefined`) | Yes (not initialized) | Yes (not initialized) |
| **Redeclaration** | Allowed | Not allowed | Not allowed |
| **Reassignment** | Allowed | Allowed | Not allowed |
| **Initialization** | Optional | Optional | Required |
| **Temporal Dead Zone** | No | Yes | Yes |
| **Use Case** | Legacy code | Variables that change | Constants, references |

## Best Practices

1. **Avoid `var`** - Use `let` or `const` instead
2. **Prefer `const`** - Use `const` by default, only use `let` when you need to reassign
3. **Use `let`** - When you need to reassign the variable
4. **Block scope** - `let` and `const` provide better scoping and prevent bugs

## Common Patterns

### Loop with let

```javascript
// Good: Each iteration gets its own 'i'
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}
```

### Constants

```javascript
// Good: Use const for values that shouldn't change
const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;
const CONFIG = {
  timeout: 5000,
  retries: 3
};
```

### When to use let

```javascript
// Use let when you need to reassign
let count = 0;
count++; // Need to reassign, so use let

let user = null;
if (isLoggedIn) {
  user = getUser(); // Reassignment needed
}
```

## Key Takeaways

1. **`var` is function-scoped**, `let` and `const` are **block-scoped**
2. **`var` can be redeclared**, `let` and `const` **cannot**
3. **`const` cannot be reassigned**, `let` and `var` **can**
4. **`let` and `const` have Temporal Dead Zone**, `var` doesn't
5. **Always prefer `const`**, use `let` only when reassignment is needed
6. **Avoid `var`** in modern JavaScript code

