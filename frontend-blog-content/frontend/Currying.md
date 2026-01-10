# Currying in JavaScript

## Overview
Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. It allows for partial application of functions and creates more reusable code.

## Basic Currying

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Partial application
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(3)); // 6
```

## Generic Currying Function

```javascript
function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function(...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const sum = (a, b, c, d) => a + b + c + d;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)(4)); // 10
console.log(curriedSum(1, 2)(3, 4)); // 10
console.log(curriedSum(1, 2, 3)(4)); // 10
```

## Advanced: Unlimited Arguments

```javascript
// Currying with unlimited arguments (requires empty call to execute)
function sum(a) {
  return function(b) {
    if (b) return sum(a + b);
    return a;
  };
}

const result = sum(1)(2)(3)(4)(5)();
console.log(result); // 15
```

## Without Extra Parentheses

```javascript
function sumWithoutExtraBraces(a) {
  function sum(b) {
    a += b;
    return sum;
  }
  
  // valueOf converts object to primitive value
  sum.valueOf = function() {
    return a;
  };
  
  return sum;
}

// Unary operator coerces to primitive value
console.log(+sumWithoutExtraBraces(1)(2)(3)(4)); // 10
```

## Practical Example: Event Handling

```javascript
const log = (level) => (message) => (timestamp) => {
  console.log(`[${timestamp}] ${level}: ${message}`);
};

const logError = log("ERROR");
const logErrorNow = logError("Failed to fetch data");
logErrorNow(new Date().toISOString());
// [2024-01-01T12:00:00.000Z] ERROR: Failed to fetch data
```

## Benefits of Currying

1. **Partial Application**: Create specialized functions from general ones
2. **Function Composition**: Easier to combine functions
3. **Reusability**: Create reusable function templates
4. **Readability**: More declarative code style

## Key Points
- Currying transforms multi-argument functions into single-argument chains
- Enables partial application and function composition
- Useful for creating reusable, specialized functions
- Can be implemented manually or with a generic curry utility

