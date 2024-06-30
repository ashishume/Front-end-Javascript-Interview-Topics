/**
 * lodash insert()
 * Simpler version for interview purpose.
 */

function simplerIsEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (let key in a) {
    if (!simplerIsEqual(a[key], b[key])) return false;
  }

  return true;
}

/** supports data types like:
 * Primitive data types
 * Array, Objects literals, Function
 */
function isEqual(obj1, obj2) {
  function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  }

  let type = getType(obj1);

  // If the two items are not the same type, return false
  if (type !== getType(obj2)) return false;
  if (type === "array") return areArraysEqual();
  if (type === "object") return areObjectsEqual();
  if (type === "function") return areFunctionsEqual();

  function areArraysEqual() {
    // Check length
    if (obj1.length !== obj2.length) return false;
    // Check each item in the array
    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false;
    }
    // If no errors, return true
    return true;
  }
  function areObjectsEqual() {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    // Check each item in the object
    for (let key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (!isEqual(obj1[key], obj2[key])) return false;
      }
    }
    // If no errors, return true
    return true;
  }
  function areFunctionsEqual() {
    return obj1.toString() === obj2.toString();
  }
  function arePrimativesEqual() {
    return obj1 === obj2;
  }
  return arePrimativesEqual();
}

const a = {
  name: "Ashish",
  age: 24,
  more: {
    random: "data",
  },
  // array: [1, 2, 3],
  // rand: () => {},
};
const b = {
  name: "Ashish",
  // array: [1, 2, 3],
  age: 24,
  more: {
    random: "data",
  },
  // rand: () => {},
};
const res = simplerIsEqual(a, b);
console.log(res);
