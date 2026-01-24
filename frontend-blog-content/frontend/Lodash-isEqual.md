# Lodash isEqual() Implementation in JavaScript

## Overview
Lodash's `isEqual()` performs a deep equality check between two values. Unlike `===` or `==`, it recursively compares objects and arrays, checking if they have the same structure and values, regardless of reference equality.

## Basic Implementation

```javascript
/**
 * lodash isEqual()
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
```

## Complete Implementation

```javascript
/** Supports data types like:
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

// Usage
const a = {
  name: "Ashish",
  age: 24,
  more: {
    random: "data",
  },
};
const b = {
  name: "Ashish",
  age: 24,
  more: {
    random: "data",
  },
};
const res = simplerIsEqual(a, b);
console.log(res); // true
```

## Enhanced Implementation

### Handling More Data Types
```javascript
function isEqual(a, b) {
  // Same reference
  if (a === b) {
    return true;
  }
  
  // Handle null
  if (a === null || b === null) {
    return a === b;
  }
  
  // Handle undefined
  if (a === undefined || b === undefined) {
    return a === b;
  }
  
  // Different types
  if (typeof a !== typeof b) {
    return false;
  }
  
  // Handle primitives
  if (typeof a !== "object") {
    return a === b;
  }
  
  // Handle Date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  // Handle RegExp
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }
  
  // Handle Array
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }
  
  // Handle Object
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) {
    return false;
  }
  
  for (let key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }
    if (!isEqual(a[key], b[key])) {
      return false;
    }
  }
  
  return true;
}
```

### With Circular Reference Handling
```javascript
function isEqual(a, b, visited = new WeakMap()) {
  // Same reference
  if (a === b) {
    return true;
  }
  
  // Handle null/undefined
  if (a == null || b == null) {
    return a === b;
  }
  
  // Different types
  if (typeof a !== typeof b) {
    return false;
  }
  
  // Handle primitives
  if (typeof a !== "object") {
    return a === b;
  }
  
  // Check for circular references
  if (visited.has(a) && visited.get(a) === b) {
    return true;
  }
  visited.set(a, b);
  
  // Handle Date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  // Handle RegExp
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }
  
  // Handle Array
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i], visited)) return false;
    }
    return true;
  }
  
  // Handle Object
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) {
    return false;
  }
  
  for (let key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }
    if (!isEqual(a[key], b[key], visited)) {
      return false;
    }
  }
  
  return true;
}
```

## Use Cases

### 1. State Comparison
```javascript
const previousState = { user: { name: "John" } };
const currentState = { user: { name: "John" } };

if (isEqual(previousState, currentState)) {
  console.log("State unchanged");
}
```

### 2. Form Validation
```javascript
const originalData = { name: "John", age: 30 };
const editedData = { name: "John", age: 30 };

if (isEqual(originalData, editedData)) {
  console.log("No changes made");
} else {
  console.log("Form has been modified");
}
```

### 3. Cache Invalidation
```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    for (const [cachedKey, cachedValue] of cache.entries()) {
      if (isEqual(JSON.parse(cachedKey), args)) {
        return cachedValue;
      }
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

### 4. Testing
```javascript
function assertEqual(actual, expected) {
  if (!isEqual(actual, expected)) {
    throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}
```

## Comparison with Other Methods

### === (Strict Equality)
```javascript
const a = { x: 1 };
const b = { x: 1 };
a === b; // false (different references)
isEqual(a, b); // true (same structure)
```

### == (Loose Equality)
```javascript
1 == "1"; // true (type coercion)
isEqual(1, "1"); // false (different types)
```

### JSON.stringify
```javascript
// ❌ Doesn't handle functions, undefined, symbols
JSON.stringify({ a: undefined }) === JSON.stringify({ b: undefined }); // true (wrong!)

// ✅ Handles all types
isEqual({ a: undefined }, { b: undefined }); // false (correct)
```

## Performance Considerations

### Optimized Version
```javascript
function isEqualFast(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== "object" || typeof b !== "object") return false;
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!keysB.includes(key) || !isEqualFast(a[key], b[key])) {
      return false;
    }
  }
  
  return true;
}
```

## Best Practices

1. **Use for Deep Comparison**: When you need structural equality
2. **Handle Edge Cases**: null, undefined, dates, regex
3. **Consider Performance**: Can be slow for large objects
4. **Use for Testing**: Perfect for assertion libraries
5. **Cache Results**: For frequently compared objects
6. **Type Safety**: Ensure types match before deep comparison

## Common Pitfalls

### Pitfall 1: Function Comparison
```javascript
// Functions are compared by string representation
const fn1 = () => console.log("test");
const fn2 = () => console.log("test");
isEqual(fn1, fn2); // true (same string)
```

### Pitfall 2: Property Order
```javascript
// Property order doesn't matter
const a = { x: 1, y: 2 };
const b = { y: 2, x: 1 };
isEqual(a, b); // true
```

### Pitfall 3: Prototype Properties
```javascript
// Only own properties are compared
class MyClass {}
const a = new MyClass();
const b = new MyClass();
isEqual(a, b); // true (if no own properties)
```

## Real-World Example

```javascript
class StateManager {
  constructor() {
    this.state = {};
    this.listeners = [];
  }
  
  setState(newState) {
    if (!isEqual(this.state, newState)) {
      this.state = newState;
      this.notifyListeners();
    }
  }
  
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}
```
