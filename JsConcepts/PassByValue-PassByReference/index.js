/**
 * JavaScript Pass by Value vs Pass by Reference
 *
 * JavaScript is always pass by value, but for objects and arrays,
 * the value being passed is a reference to the object/array.
 */

// Example 1: Pass by Value (Primitive Types)
function modifyPrimitive(value) {
  value = 10;
  console.log("Inside function:", value); // 10
}

let number = 5;
modifyPrimitive(number);
console.log("Outside function:", number); // 5

// Example 2: Pass by Value of Reference (Arrays)
function modifyArray(arr) {
  arr.push(4);
  console.log("Inside function:", arr); // [1, 2, 3, 4]

  // Reassignment doesn't affect original array
  arr = [];
  console.log("After reassignment:", arr); // []
}

let numbers = [1, 2, 3];
modifyArray(numbers);
console.log("Outside function:", numbers); // [1, 2, 3, 4]

// Example 3: Pass by Value of Reference (Objects)
function modifyObject(obj) {
  obj.age = 25;
  console.log("Inside function:", obj); // { name: "John", age: 25 }

  // Reassignment doesn't affect original object
  obj = { name: "Jane" };
  console.log("After reassignment:", obj); // { name: "Jane" }
}

let person = { name: "John" };
modifyObject(person);
console.log("Outside function:", person); // { name: "John", age: 25 }

/**
 * Key Points:
 * 1. JavaScript always passes by value
 * 2. For objects/arrays, the value is a reference
 * 3. Modifying properties of passed objects affects the original
 * 4. Reassigning the parameter doesn't affect the original
 */
