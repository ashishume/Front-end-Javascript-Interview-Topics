# Callbacks in JavaScript

## Overview
In JavaScript, a callback is a function passed into another function as an argument to be executed later. Callbacks are fundamental to JavaScript's asynchronous programming model and are used extensively in event handling, timers, and asynchronous operations.

## Understanding Asynchronous Programming

JavaScript is a synchronous single-threaded language, but with the help of event-loop and promises, JavaScript is used to do asynchronous programming.

- **Synchronous**: Code runs in a particular sequence of instructions given in the program
- **Asynchronous**: Code execution allows the execution of upcoming instructions immediately, avoiding blocking of tasks due to previous instructions

**Note**: Asynchronous is a non-blocking architecture, so the execution of one task isn't dependent on another. Tasks can run simultaneously. Synchronous is a blocking architecture, so the execution of each operation is dependent on the completion of the one before it.

## Basic Callback Example

```javascript
function calculateMultiply(sum) {
  return sum * 2;
}

function sum(x, y, callback) {
  let s = x + y;
  return callback(s);  // calculateMultiply is being used as callback
}

const result = sum(2, 5, calculateMultiply);
console.log(result); // 14
```

## Common Callback Patterns

### 1. setTimeout Callback
```javascript
setTimeout(() => {
  console.log("This runs after 1 second");
}, 1000);
```

### 2. Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
  console.log(num);
});

const doubled = numbers.map((num) => num * 2);
```

### 3. Event Handlers
```javascript
button.addEventListener('click', (event) => {
  console.log('Button clicked!');
});
```

## Callback Hell

When callbacks are nested deeply, it creates "callback hell" or "pyramid of doom":

```javascript
function sum(s, callback) {
  callback(s + 1);
}

function multiply(s, callback) {
  callback(s * 10);
}

function subtract(s, callback) {
  callback(s - 10);
}

function divide(s) {
  console.log(s / 2);
  return s / 2;
}

// Callback hell - nested callbacks
const result = sum(10, (action) => {
  console.log(action);
  multiply(action, (action2) => {
    console.log(action2);
    subtract(action2, (action3) => {
      console.log(action3);
      divide(action3);
    });
  });
});
```

## Problems with Callbacks

1. **Callback Hell**: Deeply nested callbacks become hard to read and maintain
2. **Error Handling**: Difficult to handle errors in nested callbacks
3. **Inversion of Control**: You lose control over when and how callbacks execute
4. **Hard to Debug**: Stack traces can be confusing with nested callbacks

## Modern Alternatives

### Promises
```javascript
sum(10)
  .then(multiply)
  .then(subtract)
  .then(divide)
  .catch(handleError);
```

### Async/Await
```javascript
async function processData() {
  try {
    const result1 = await sum(10);
    const result2 = await multiply(result1);
    const result3 = await subtract(result2);
    const final = await divide(result3);
    return final;
  } catch (error) {
    handleError(error);
  }
}
```

## When to Use Callbacks

Callbacks are still useful for:
- Simple event handlers
- Array iteration methods (forEach, map, filter)
- Simple asynchronous operations
- Library APIs that require callbacks
- Node.js style APIs

## Best Practices

1. **Keep callbacks simple**: Avoid complex logic in callbacks
2. **Handle errors**: Always include error handling in callbacks
3. **Use named functions**: Instead of anonymous functions for better debugging
4. **Consider Promises/Async-Await**: For complex asynchronous flows
5. **Avoid deep nesting**: Refactor nested callbacks into separate functions

## Example: Named Callback Function

```javascript
function handleSuccess(data) {
  console.log('Success:', data);
}

function handleError(error) {
  console.error('Error:', error);
}

fetchData(url, handleSuccess, handleError);
```
