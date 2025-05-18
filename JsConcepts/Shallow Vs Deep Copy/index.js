/**
 * Demonstrates different ways to copy objects in JavaScript and their implications
 * Reference: https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
 */

// Original object with nested structure
const person = {
  firstName: "John",
  lastName: "Doe",
  address: {
    city: "Coochbehar",
    state: "West Bengal",
    country: "India",
  },
};

// Method 1: Shallow copy using spread operator
const shallowCopy1 = { ...person };

// Method 2: Shallow copy using Object.assign()
const shallowCopy2 = Object.assign({}, person);

// Method 3: Deep copy using JSON methods
const deepCopy = JSON.parse(JSON.stringify(person));

/**
 * Key differences between shallow and deep copy:
 *
 * Shallow copy:
 * - Creates a new object with references to the same nested objects
 * - Changes to nested objects affect both copies
 * - Methods: spread operator, Object.assign()
 *
 * Deep copy:
 * - Creates completely independent copies of all nested objects
 * - Changes to nested objects only affect the copy
 * - Methods: JSON.parse(JSON.stringify()), structuredClone(), lodash.cloneDeep()
 *
 * Note: JSON methods have limitations:
 * - Cannot handle circular references
 * - Cannot copy functions, undefined, or other non-JSON-serializable values
 * - For complex cases, consider using structuredClone() or lodash.cloneDeep()
 */

// Demonstrating shallow copy behavior
shallowCopy2.address.state = "Karnataka";
console.log("Original person:", person.address.state); // "Karnataka"
console.log("Shallow copy:", shallowCopy2.address.state); // "Karnataka"

// Demonstrating deep copy behavior
deepCopy.address.state = "Delhi";
console.log("Original person:", person.address.state); // "Karnataka"
console.log("Deep copy:", deepCopy.address.state); // "Delhi"

// Example of prototype inheritance
const animal = { name: "Dog" };
person.__proto__ = animal;
