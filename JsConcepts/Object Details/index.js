/**
 * Demonstrates Object property descriptors and their configuration
 * Shows how to define and inspect property attributes
 */

// Create a sample object
const obj = {
  a: "sample value",
  b: 1,
  c: 4,
};

// Configure single property
Object.defineProperty(obj, "a", {
  enumerable: false, // Property won't show up in for...in loops
});

// Configure multiple properties
Object.defineProperties(obj, {
  b: {
    enumerable: false, // Property won't show up in for...in loops
  },
  c: {
    enumerable: true,
    configurable: false, // Property cannot be deleted or reconfigured
  },
});

// Example of property deletion (commented out)
// console.log(delete obj.c); // Returns false due to configurable: false
// console.log(obj); // {c: 4}

// Example of property enumeration (commented out)
/*
for (let key in obj) {
  console.log("==>", obj[key]); // Only prints 4 (property 'c')
}
*/

// Get descriptor for a single property
/*
console.log(Object.getOwnPropertyDescriptor(obj, "a"));
Output:
{
  value: 'sample value',
  writable: true,     // Can be modified
  enumerable: false,  // Won't show in loops
  configurable: true  // Can be reconfigured
}
*/

// Get descriptors for all properties
/*
console.log(Object.getOwnPropertyDescriptors(obj));
Output:
{
  a: {
    value: 'sample value',
    writable: true,
    enumerable: false,
    configurable: true
  },
  b: {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
  },
  c: {
    value: 4,
    writable: true,
    enumerable: true,
    configurable: false
  }
}
*/
