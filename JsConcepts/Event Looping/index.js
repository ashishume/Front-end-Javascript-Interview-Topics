/** Event Loop Concept */

// For more detailed explanation, refer to:
// https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd

/**
 * Visual Event Loop Example:
 * https://www.jsv9000.app/
 */

/**
 * JavaScript is a single-threaded language.
 * When multiple function calls or events occur, they are queued in the EVENT QUEUE.
 * The EVENT LOOP processes these queued functions and events from the CALL STACK.
 */

// Promise callbacks (thenables) are executed before setTimeout callbacks.

// The Job Queue (Microtask Queue) has higher priority than the Callback Queue.
// When the event loop reaches the Job Queue, it will process all jobs in the queue
// before moving to the Callback Queue.

/* Execution Priority:
 1. Main Stack Execution   // Synchronous code execution
 2. Job Queue (Microtask Queue) // Handles Promises and related operations
    Examples: 
    - Promise.then() and Promise.catch()
    - MutationObserver
    - fetch API
    - V8 garbage collection
    - process.nextTick() (Node.js)
 3. Callback Queue (Task Queue) // Handles Web APIs like setTimeout
 */

/**
 * STARVATION occurs when the Microtask Queue continuously generates new microtasks,
 * preventing the Callback Queue from executing.
 */

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
