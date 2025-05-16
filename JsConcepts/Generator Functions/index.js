/**
 * Generator Functions in JavaScript
 *
 * Key concepts:
 * - Functions that can pause and resume execution
 * - Use yield keyword to pause execution and return values
 * - Commonly used in Redux-Saga for handling async operations
 * - Helps solve callback hell and inversion of control problems
 */

// Example 1: Basic generator with numeric values
function* numberGenerator(initialValue) {
  yield initialValue;
  console.log("Processing...");
  yield initialValue + 10;
}

const numberGen = numberGenerator(10);

// Example 2: Generator with string values
function* stringSequence() {
  yield "First";
  yield "Second";
  yield "Third";
}

const stringGen = stringSequence();

// Demonstrate generator execution
console.log("Number Generator:");
console.log(numberGen.next()); // { value: 10, done: false }
console.log(numberGen.next()); // { value: 20, done: false }
console.log(numberGen.next()); // { value: undefined, done: true }

console.log("\nString Generator:");
console.log(stringGen.next()); // { value: "First", done: false }
console.log(stringGen.next()); // { value: "Second", done: false }
console.log(stringGen.next()); // { value: "Third", done: false }
console.log(stringGen.next()); // { value: undefined, done: true }
