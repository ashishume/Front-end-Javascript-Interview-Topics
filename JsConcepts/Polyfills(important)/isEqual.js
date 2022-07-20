/** supports data types like:
 * Primitive data types
 * Array, Objects literals, Function
 */
function isEqual(obj1, obj2) {
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
  // If the two items are not the same type, return false
  if (typeof obj1 !== typeof obj2) return false;
  if (typeof obj1 === "array") return areArraysEqual();
  if (typeof obj1 === "object") return areObjectsEqual();
  if (typeof obj1 === "function") return areFunctionsEqual();
  return arePrimativesEqual();
}

const a = {
  name: "Ashish",
  age: 24,
  array: [1, 2, 3],
  more: {
    random: "data",
  },
};
const b = {
  name: "Ashish",
  array: [1, 2, 3],
  age: 24,
  more: {
    random: "data",
  },
};
const res = isEqual(a, b);
console.log(res);
