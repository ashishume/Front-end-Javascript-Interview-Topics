# Closures in JavaScript

## Overview
A **closure** is a function bundled together with its lexical environment (surrounding state). In JavaScript, closures are created every time a function is created, at function creation time.

## Definition
A closure gives you access to an outer function's scope from an inner function. The inner function has access to:
- Its own variables
- Outer function's variables
- Global variables

## Basic Example

```javascript
function x() {
  var a = 9;
  function y() {
    console.log(a); // Accesses 'a' from outer scope
  }
  a = 100; // Modifies 'a' before calling y
  y(); // Prints 100
}
x(); // Output: 100
```

**Key Point:** The inner function `y()` has access to variable `a` even after the outer function `x()` has finished executing. The `console.log` points to the memory location of `a`, not its value at the time of function definition.

## Closure with Returned Function

```javascript
function outer() {
  var outerVar = "I'm outside!";
  
  function inner() {
    console.log(outerVar); // Accesses outerVar
  }
  
  return inner; // Returns the inner function
}

var closureFunc = outer();
closureFunc(); // "I'm outside!"
```

Even though `outer()` has finished executing, `inner()` still has access to `outerVar` because of closure.

## Nested Closures

```javascript
var a = 1;

function func() {
  return function (b) {
    return function (c) {
      return function (d) {
        // Has access to all outer scopes due to closures
        return a + b + c + d;
      };
    };
  };
}

const result = func()(3)(3)(3);
console.log(result); // 10 (1 + 3 + 3 + 3)
```

Each nested function has access to all outer scopes, creating a chain of closures.

## Practical Use Cases

### 1. Data Privacy / Encapsulation

```javascript
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
// count is not directly accessible from outside
```

### 2. Function Factories

```javascript
function multiplyBy(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 3. Event Handlers

```javascript
function setupButton(buttonId, message) {
  document.getElementById(buttonId).addEventListener('click', function() {
    alert(message); // Closure captures 'message'
  });
}

setupButton('btn1', 'Hello!');
setupButton('btn2', 'Goodbye!');
```

### 4. Memoization / Caching

```javascript
function memoize(fn) {
  const cache = {}; // Private cache
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    cache[key] = fn.apply(this, args);
    return cache[key];
  };
}
```

## Common Pitfalls

### Loop with Closures

```javascript
// Problem: All functions reference the same 'i'
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 3, 3, 3
  }, 1000);
}

// Solution 1: Use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 0, 1, 2
  }, 1000);
}

// Solution 2: IIFE (Immediately Invoked Function Expression)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Prints 0, 1, 2
    }, 1000);
  })(i);
}
```

## Closure vs Scope

### Scope
- Defines what variables we have access to
- Two types: **local scope** and **global scope**
- Determines variable visibility

### Closure
- Function within another function
- Has access to three types of scope:
  - **Local scope** (own variables)
  - **Outer scope** (enclosing function's variables)
  - **Global scope**
- Preserves the lexical environment even after outer function execution

## Key Takeaways

1. **Closures are created at function creation time**, not execution time
2. **Inner functions have access to outer function's variables** even after outer function returns
3. **Closures preserve the reference to variables**, not their values at definition time
4. **Use closures for data privacy, function factories, and maintaining state**
5. **Be careful with closures in loops** - use `let` or IIFE to create new scope
6. **Closures can lead to memory leaks** if not handled properly (variables are kept in memory)

## Memory Considerations

Closures keep variables in memory as long as the closure exists. This can be:
- **Beneficial**: Maintaining state
- **Problematic**: Memory leaks if closures hold references to large objects

```javascript
// Good: Closure is cleaned up when not needed
function createHandler() {
  const data = { /* large object */ };
  return function() {
    // Use data
  };
}

// Potential issue: Closure holds reference indefinitely
const handler = createHandler();
// If handler is never garbage collected, data stays in memory
```

