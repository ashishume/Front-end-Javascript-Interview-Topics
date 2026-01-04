# Shallow Copy vs Deep Copy in JavaScript

## Overview
Understanding the difference between shallow and deep copying is crucial when working with objects and arrays in JavaScript. The choice affects whether nested objects are shared or independently copied.

## Shallow Copy

A shallow copy creates a new object/array, but nested objects/arrays are still referenced from the original.

### Methods for Shallow Copy

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  address: {
    city: "Coochbehar",
    state: "West Bengal",
    country: "India",
  },
};

// Method 1: Spread operator
const shallowCopy1 = { ...person };

// Method 2: Object.assign()
const shallowCopy2 = Object.assign({}, person);

// Method 3: Array.slice() for arrays
const arr = [1, 2, 3];
const shallowCopy3 = arr.slice();
```

### Shallow Copy Behavior

```javascript
const original = {
  name: "John",
  address: { city: "NYC" }
};

const shallow = { ...original };

// Modifying nested object affects both
shallow.address.city = "LA";
console.log(original.address.city); // "LA" (also changed!)

// Modifying top-level property doesn't affect original
shallow.name = "Jane";
console.log(original.name); // "John" (unchanged)
```

## Deep Copy

A deep copy creates a completely independent copy, including all nested objects and arrays.

### Methods for Deep Copy

```javascript
// Method 1: JSON methods (limitations apply)
const deepCopy1 = JSON.parse(JSON.stringify(person));

// Method 2: structuredClone() (modern browsers)
const deepCopy2 = structuredClone(person);

// Method 3: Custom recursive function
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

const deepCopy3 = deepClone(person);
```

### Deep Copy Behavior

```javascript
const original = {
  name: "John",
  address: { city: "NYC" }
};

const deep = structuredClone(original);

// Modifying nested object doesn't affect original
deep.address.city = "LA";
console.log(original.address.city); // "NYC" (unchanged!)

// Modifying top-level property doesn't affect original
deep.name = "Jane";
console.log(original.name); // "John" (unchanged)
```

## JSON Methods Limitations

```javascript
const obj = {
  date: new Date(),
  func: function() {},
  undefined: undefined,
  symbol: Symbol("test"),
  circular: null
};

obj.circular = obj; // Circular reference

// JSON.parse(JSON.stringify(obj)) will:
// - Convert dates to strings
// - Remove functions
// - Remove undefined
// - Remove symbols
// - Throw error on circular references
```

## Comparison Example

```javascript
const person = {
  firstName: "John",
  address: {
    city: "Coochbehar",
    state: "West Bengal",
  },
};

// Shallow copy
const shallowCopy = { ...person };
shallowCopy.address.state = "Karnataka";
console.log(person.address.state); // "Karnataka" (changed!)

// Deep copy
const deepCopy = structuredClone(person);
deepCopy.address.state = "Delhi";
console.log(person.address.state); // "Karnataka" (unchanged)
```

## When to Use Each

### Use Shallow Copy When:
- You only need to copy top-level properties
- Nested objects don't need to be independent
- Performance is critical (shallow is faster)

### Use Deep Copy When:
- You need completely independent copies
- Nested objects will be modified
- Working with complex nested structures

## Key Points
- **Shallow copy**: Top-level properties are copied, nested objects are referenced
- **Deep copy**: All levels are independently copied
- `JSON.parse(JSON.stringify())` has limitations (no functions, dates, circular refs)
- `structuredClone()` is the modern, recommended approach for deep copying
- Consider performance: shallow copy is faster but may not suit all use cases

