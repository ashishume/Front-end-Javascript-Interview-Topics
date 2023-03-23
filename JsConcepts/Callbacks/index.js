/*

In JavaScript, a callback is a function passed into another function as an argument to be executed later.

Javascript is the synchronous single-threaded language but with the help of event-loop 
and promises, JavaScript is used to do asynchronous programming.

Synchronous means the code runs in a particular sequence of instructions given in the program, 
whereas asynchronous code execution allows to execution of the upcoming instructions immediately.
Because of asynchronous programming we can avoid the blocking of tasks due to the previous instructions.
*/


/**
 * Note: Asynchronous is a non-blocking architecture, so the execution of one task isn't dependent 
 * on another. Tasks can run simultaneously. Synchronous is a blocking architecture, so the execution 
 * of each operation is dependent on the completion of the one before it
 */

function calculateMultiply(sum) {
  return sum * 2;
}

function sum(x, y, callback) {
  let s = x + y;
  return callback(s);                   //calculateMultiply is being used as callbacks
}

const a = sum(2, 5, calculateMultiply);
console.log(a);

/*
similarly setTimeout also have callbacks
*/