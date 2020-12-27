// Refer article for more about event loop
//medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd

// Javascript is single threaded language
// due to which when various fucntion calls or events are put into queue that is called as EVENT QUEUE
//Event looop is the execution of various functions and events from stack of event queue (CALL STACK)

// All `thenable`(Promise) callbacks of the promise are called first, then the setTimeout callback is called.

// Job Queue has high priority in executing callbacks, if event loop tick comes to Job Queue, it will execute all the jobs in job queue
// first until it gets empty, then will move to callback queue.

// Priority
// 1. Main stack execution  // all kind of task execution
// 2. Job Queue (also called microtask queue) // only reserved for Promises
// 3. Callback queue   //settimeout (all kinds of web APIs)



//if microtask queue keeps on mutating continuos thenable statements, it will not allow callback queue to execute
// this is called STARVATION  



console.log("Message no. 1: Sync"); // executes 1

setTimeout(function () {
  console.log("Message no. 2: setTimeout"); // executes 5
}, 0);

var promise = new Promise(function (resolve, reject) {
  resolve();
});

promise
  .then(function (resolve) {
    console.log("Message no. 3: 1st Promise"); // executes 3
  })
  .then(function (resolve) {
    console.log("Message no. 4: 2nd Promise"); // executes 4
  });

console.log("Message no. 5: Sync"); // executes 2
