/*

In JavaScript, a callback is a function passed into another function as an argument to be executed later.

Since js is synchronous so, to doesnt wait for anyone, to avoid missing any execution, we pass functions 
(callback)as an argument to make sure execution occurs in async manner
given below is example
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