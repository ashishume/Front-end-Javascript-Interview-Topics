# Function Statement vs Function Expression in JavaScript

## Overview
JavaScript provides two ways to define functions: **Function Statements** (declarations) and **Function Expressions**. They differ in hoisting behavior, when they can be called, and their use cases.

## Function Statement (Declaration)

A function statement is hoisted to the top of its scope and can be called before it's declared.

### Syntax

```javascript
function functionName(parameters) {
  // function body
}
```

### Characteristics

```javascript
// Can be called before declaration (hoisted)
greet("John"); // Works!

function greet(name) {
  console.log("Hello", name);
}

// Function is hoisted, so this works:
console.log(typeof greet); // "function" (even before declaration in code)
```

### Hoisting Behavior

```javascript
// During hoisting, function declarations are moved to top
console.log(sayHello); // [Function: sayHello] (not undefined)

function sayHello() {
  console.log("Hello");
}

// Equivalent to:
// function sayHello() { ... }
// console.log(sayHello);
```

## Function Expression

A function expression assigns a function to a variable. It's not hoisted and cannot be called before declaration.

### Syntax

```javascript
const functionName = function(parameters) {
  // function body
};
```

### Characteristics

```javascript
// Cannot be called before declaration
// sayHello("Jane"); // ReferenceError: Cannot access before initialization

const sayHello = function(name) {
  console.log("Hi", name);
};

sayHello("Jane"); // Works after declaration
```

### Hoisting Behavior

```javascript
// Function expressions are not hoisted
console.log(sayHello); // undefined (not ReferenceError for var, but TDZ for let/const)

const sayHello = function() {
  console.log("Hello");
};
```

## Named Function Expression

A function expression can have a name, which is useful for debugging and recursion.

```javascript
const calculate = function mathOperation(x, y) {
  console.log("Calculating...");
  // Name is only available inside the function
  console.log(mathOperation.name); // "mathOperation"
  return x + y;
};

console.log(calculate.name); // "mathOperation"
// console.log(mathOperation); // ReferenceError (not in outer scope)
```

## Arrow Functions (Function Expression)

Arrow functions are a type of function expression with shorter syntax.

```javascript
// Regular function expression
const add1 = function(a, b) {
  return a + b;
};

// Arrow function expression
const add2 = (a, b) => {
  return a + b;
};

// Arrow function (implicit return)
const add3 = (a, b) => a + b;
```

## Key Differences

| Feature | Function Statement | Function Expression |
|---------|-------------------|---------------------|
| **Hoisting** | ✅ Hoisted | ❌ Not hoisted |
| **Call before declaration** | ✅ Yes | ❌ No |
| **Syntax** | `function name() {}` | `const name = function() {}` |
| **Name** | Required | Optional (can be anonymous) |
| **this binding** | Has own `this` | Has own `this` (arrow functions inherit) |

## Use Cases

### Function Statement

```javascript
// Good for: Main functions, reusable utilities
function processData(data) {
  // Can be called from anywhere in scope
  return data.map(item => item * 2);
}

// Can call before declaration
const result = processData([1, 2, 3]);
```

### Function Expression

```javascript
// Good for: Callbacks, conditionally defined functions, closures
const button = document.getElementById("btn");

// Callback function
button.addEventListener("click", function() {
  console.log("Button clicked");
});

// Conditional function
let greet;
if (user.isAdmin) {
  greet = function() {
    console.log("Hello Admin");
  };
} else {
  greet = function() {
    console.log("Hello User");
  };
}

// IIFE (Immediately Invoked Function Expression)
(function() {
  console.log("IIFE executed");
})();
```

## First-Class Functions

Both function statements and expressions are first-class citizens, meaning they can be:
- Assigned to variables
- Passed as arguments
- Returned from functions

```javascript
// Function as argument
function processFunction(fn) {
  console.log("Processing function...");
  fn();
}

processFunction(function() {
  console.log("I am a function passed as an argument");
});

// Function as return value
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // 10
```

## Common Patterns

### Callback Pattern

```javascript
// Function expression as callback
setTimeout(function() {
  console.log("Delayed execution");
}, 1000);

// Arrow function as callback
setTimeout(() => {
  console.log("Arrow function callback");
}, 1000);
```

### Method Assignment

```javascript
const obj = {
  // Method (function expression in object)
  greet: function(name) {
    return `Hello, ${name}`;
  },
  
  // Shorthand method (ES6)
  sayHello(name) {
    return `Hi, ${name}`;
  }
};
```

## Best Practices

1. **Use function statements** for main, reusable functions
2. **Use function expressions** for callbacks and one-time use functions
3. **Use arrow functions** when you need lexical `this` binding
4. **Be aware of hoisting** - function statements can be called before declaration

## Key Points
- **Function Statement**: Hoisted, can be called before declaration
- **Function Expression**: Not hoisted, must be declared before use
- Function expressions are more flexible (can be anonymous, conditional)
- Both are first-class functions (can be passed, returned, assigned)
- Arrow functions are a type of function expression
- Choose based on hoisting needs and use case

