/**
 * Function Statement vs Function Expression
 *
 * Function Statement (Declaration):
 * - Hoisted to the top of their scope
 * - Can be called before declaration
 * - Syntax: function name() {}
 *
 * Function Expression:
 * - Not hoisted
 * - Cannot be called before declaration
 * - Syntax: const name = function() {}
 */

// Function Statement Example
function greet(name) {
  console.log("Hello", name);
}
greet("John"); // Works - function is hoisted

// Function Expression Example
const sayHello = function (name) {
  console.log("Hi", name);
};
// sayHello("Jane"); // Would throw ReferenceError if called before declaration

// Named Function Expression
const calculate = function mathOperation(x, y) {
  console.log("Calculating...");
  return x + y;
};

// First Class Function Example
function processFunction(fn) {
  console.log("Processing function...");
  fn();
}

processFunction(function () {
  console.log("I am a function passed as an argument");
});
