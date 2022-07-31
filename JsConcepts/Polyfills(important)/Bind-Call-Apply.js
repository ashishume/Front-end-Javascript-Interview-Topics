Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "this is not callable");
  }
  context.func = this; //pass the context into new function 'func'
  return function (...newArgs) {
    //returning the function instead of calling it,
    //so user can call the function later
    return context.func(...args, ...newArgs);
  };
};

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "this is not callable");
  }
  context.func = this; //pass the context into new function 'func'
  context.func(...args); //call the function directly
};

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "this is not callable");
  }
  if (!Array.isArray(args)) {
    throw new Error("arguments are not array");
  }
  context.func = this; //pass the context into new function 'func'
  context.func(...args); //call the function directly
};

// const person = {
//   age: 24,
// };
// function testFunction() {
//   console.log("hey ashish");
// }
// console.log(testFunction.myBind(person));
