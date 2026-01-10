# Event Loop in JavaScript

## Overview
JavaScript is a **single-threaded** language, meaning it can only execute one task at a time. The Event Loop is the mechanism that allows JavaScript to handle asynchronous operations despite being single-threaded.

## How Event Loop Works

When multiple function calls or events occur, they are queued in the **Event Queue**. The **Event Loop** processes these queued functions and events from the **Call Stack**.

## Execution Priority

The Event Loop processes tasks in the following order:

1. **Main Stack Execution** (Synchronous code)
   - All synchronous code executes first
   - Functions are added to the call stack and executed immediately

2. **Job Queue (Microtask Queue)** - Higher Priority
   - Handles Promises and related operations
   - Examples:
     - `Promise.then()` and `Promise.catch()`
     - `MutationObserver`
     - `fetch API`
     - V8 garbage collection
     - `process.nextTick()` (Node.js)

3. **Callback Queue (Task Queue)** - Lower Priority
   - Handles Web APIs like `setTimeout`, `setInterval`
   - DOM events
   - I/O operations

## Key Concept: Microtask Queue vs Callback Queue

**Microtask Queue has higher priority than Callback Queue.** When the event loop reaches the Microtask Queue, it will process **all** jobs in the queue before moving to the Callback Queue.

## Example: Understanding Execution Order

```javascript
console.log("Message no. 1: Sync"); // executes 1

setTimeout(function () {
  console.log("Message no. 2: setTimeout"); // executes 6
}, 0);

var promise = new Promise(function (resolve, reject) {
  console.log("Message no. 3: inside promise, before resolve"); // executes 2
  resolve();
});

promise
  .then(function (resolve) {
    console.log("Message no. 4: 1st Promise"); // executes 4
  })
  .then(function (resolve) {
    console.log("Message no. 5: 2nd Promise"); // executes 5
  });

console.log("Message no. 6: Sync"); // executes 3
```

**Output:**
```
Message no. 1: Sync
Message no. 3: inside promise, before resolve
Message no. 6: Sync
Message no. 4: 1st Promise
Message no. 5: 2nd Promise
Message no. 2: setTimeout
```

## Explanation

1. Synchronous code executes first (messages 1, 3, 6)
2. Promise callbacks (microtasks) execute before setTimeout (message 4, 5)
3. setTimeout callback (macrotask) executes last (message 2)

## Starvation

**Starvation** occurs when the Microtask Queue continuously generates new microtasks, preventing the Callback Queue from executing. This can happen if you create an infinite loop of promises.

```javascript
// Example of starvation
function createMicrotask() {
  Promise.resolve().then(() => {
    console.log("Microtask");
    createMicrotask(); // Creates another microtask
  });
}

createMicrotask(); // This will block setTimeout forever
setTimeout(() => console.log("This may never execute"), 0);
```

## Visual Tools

- **JSV9000**: https://www.jsv9000.app/ - Interactive event loop visualizer
- **Loupe**: http://latentflip.com/loupe/ - Another great visualization tool

## Key Takeaways

1. JavaScript is single-threaded but handles async operations through the Event Loop
2. Microtasks (Promises) have higher priority than macrotasks (setTimeout)
3. The Event Loop continuously checks: Call Stack → Microtask Queue → Callback Queue
4. All microtasks are processed before any macrotask
5. Be careful of microtask starvation in production code

