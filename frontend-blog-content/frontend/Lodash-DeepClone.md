# Lodash DeepClone Implementation in JavaScript

## Overview
Deep cloning creates a completely independent copy of an object, including all nested objects and arrays. Unlike shallow cloning, deep cloning ensures that changes to the cloned object don't affect the original object, even for deeply nested structures.

## Basic Implementation

```javascript
/**
 * lodash deepclone() 
 * cloneDeep or deepclone polyfill
 */
function cloneDeep(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    const newArray = [];
    for (let i = 0; i < obj.length; i++) {
      newArray[i] = cloneDeep(obj[i]);
    }
    return newArray;
  }
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = cloneDeep(obj[key]);
    }
  }
  return newObj;
}

// Usage
const obj = {
  a: 55,
  b: {
    age: "value string",
    c: {
      random: "random string",
      d: [1, 2, 6, 7],
    },
  },
};
const obj2 = cloneDeep(obj);

// Changing the nested values won't affect the original object
obj2.b.c.d[0] = "25";

console.log("old", obj);  // Original unchanged
console.log("new", obj2); // New object with changes
```

## Enhanced Implementation

### Handling More Data Types
```javascript
function cloneDeep(obj) {
  // Handle null and undefined
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  // Handle primitives
  if (typeof obj !== "object") {
    return obj;
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => cloneDeep(item));
  }
  
  // Handle Object
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = cloneDeep(obj[key]);
    }
  }
  
  return cloned;
}
```

### With Circular Reference Handling
```javascript
function cloneDeep(obj, visited = new WeakMap()) {
  // Handle primitives
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  
  // Handle circular references
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  
  // Handle Date
  if (obj instanceof Date) {
    const cloned = new Date(obj.getTime());
    visited.set(obj, cloned);
    return cloned;
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const cloned = [];
    visited.set(obj, cloned);
    cloned.push(...obj.map(item => cloneDeep(item, visited)));
    return cloned;
  }
  
  // Handle Object
  const cloned = {};
  visited.set(obj, cloned);
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = cloneDeep(obj[key], visited);
    }
  }
  
  return cloned;
}
```

## Complete Implementation

```javascript
function cloneDeep(obj, visited = new WeakMap()) {
  // Handle null and undefined
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  // Handle primitives (string, number, boolean, symbol, bigint)
  if (typeof obj !== "object") {
    return obj;
  }
  
  // Handle circular references
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  
  // Handle Date
  if (obj instanceof Date) {
    const cloned = new Date(obj.getTime());
    visited.set(obj, cloned);
    return cloned;
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    const cloned = new RegExp(obj.source, obj.flags);
    visited.set(obj, cloned);
    return cloned;
  }
  
  // Handle Map
  if (obj instanceof Map) {
    const cloned = new Map();
    visited.set(obj, cloned);
    obj.forEach((value, key) => {
      cloned.set(cloneDeep(key, visited), cloneDeep(value, visited));
    });
    return cloned;
  }
  
  // Handle Set
  if (obj instanceof Set) {
    const cloned = new Set();
    visited.set(obj, cloned);
    obj.forEach(value => {
      cloned.add(cloneDeep(value, visited));
    });
    return cloned;
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const cloned = [];
    visited.set(obj, cloned);
    obj.forEach((item, index) => {
      cloned[index] = cloneDeep(item, visited);
    });
    return cloned;
  }
  
  // Handle Object
  const cloned = {};
  visited.set(obj, cloned);
  
  // Copy own properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = cloneDeep(obj[key], visited);
    }
  }
  
  // Copy symbol properties
  const symbols = Object.getOwnPropertySymbols(obj);
  symbols.forEach(symbol => {
    cloned[symbol] = cloneDeep(obj[symbol], visited);
  });
  
  return cloned;
}
```

## Alternative Methods

### Using JSON (Limited)
```javascript
function cloneDeepJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Limitations:
// - Doesn't handle functions
// - Doesn't handle undefined
// - Doesn't handle symbols
// - Doesn't handle circular references
// - Doesn't handle Date, RegExp, Map, Set
```

### Using Structured Clone (Modern)
```javascript
function cloneDeepStructured(obj) {
  return structuredClone(obj);
}

// Browser support: Modern browsers only
// Handles: Most types including Date, RegExp, Map, Set
// Doesn't handle: Functions, DOM nodes, some built-in objects
```

## Use Cases

### 1. State Management
```javascript
const currentState = {
  user: { name: "John", preferences: { theme: "dark" } },
  items: [{ id: 1, name: "Item 1" }]
};

// Create immutable update
const newState = cloneDeep(currentState);
newState.user.preferences.theme = "light";
// currentState remains unchanged
```

### 2. Configuration Objects
```javascript
const defaultConfig = {
  api: { baseUrl: "https://api.example.com", timeout: 5000 },
  ui: { theme: "light", language: "en" }
};

// Create user-specific config
const userConfig = cloneDeep(defaultConfig);
userConfig.ui.theme = "dark";
```

### 3. Data Transformation
```javascript
const originalData = {
  users: [
    { id: 1, name: "John", metadata: { role: "admin" } }
  ]
};

// Transform without mutating original
const transformed = cloneDeep(originalData);
transformed.users.forEach(user => {
  user.displayName = user.name.toUpperCase();
});
```

## Performance Considerations

### Optimized Version
```javascript
function cloneDeepFast(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (cache.has(obj)) return cache.get(obj);
  
  let cloned;
  
  if (Array.isArray(obj)) {
    cloned = [];
    cache.set(obj, cloned);
    for (let i = 0; i < obj.length; i++) {
      cloned[i] = cloneDeepFast(obj[i], cache);
    }
  } else {
    cloned = {};
    cache.set(obj, cloned);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = cloneDeepFast(obj[key], cache);
      }
    }
  }
  
  return cloned;
}
```

## Comparison with Shallow Clone

```javascript
// Shallow clone
const shallow = Object.assign({}, obj);
// or
const shallow = { ...obj };

// Deep clone
const deep = cloneDeep(obj);

// Example
const original = { a: { b: 1 } };
const shallowCopy = { ...original };
const deepCopy = cloneDeep(original);

shallowCopy.a.b = 2;
console.log(original.a.b); // 2 (changed!)

deepCopy.a.b = 3;
console.log(original.a.b); // 2 (unchanged!)
```

## Best Practices

1. **Use for Complex Objects**: When you need complete independence
2. **Handle Circular References**: Use WeakMap to track visited objects
3. **Consider Performance**: Deep cloning can be expensive for large objects
4. **Type Safety**: Handle all data types you expect
5. **Memory Management**: Be aware of memory usage for large clones
6. **Use Structured Clone**: When available, it's faster and handles more types

## Common Pitfalls

### Pitfall 1: Functions Not Cloned
```javascript
// Functions are not cloned, they're referenced
const obj = { fn: () => console.log("test") };
const cloned = cloneDeep(obj);
cloned.fn === obj.fn; // true (same reference)
```

### Pitfall 2: Prototype Chain
```javascript
// Prototype chain is not preserved
class MyClass {}
const obj = new MyClass();
const cloned = cloneDeep(obj);
cloned instanceof MyClass; // false
```

### Pitfall 3: Non-enumerable Properties
```javascript
// Only enumerable properties are cloned
const obj = {};
Object.defineProperty(obj, "hidden", {
  value: "secret",
  enumerable: false
});
const cloned = cloneDeep(obj);
cloned.hidden; // undefined
```

## Real-World Example

```javascript
class StateManager {
  constructor(initialState) {
    this.state = cloneDeep(initialState);
    this.history = [cloneDeep(initialState)];
  }
  
  updateState(updater) {
    const newState = cloneDeep(this.state);
    updater(newState);
    this.state = newState;
    this.history.push(cloneDeep(newState));
  }
  
  undo() {
    if (this.history.length > 1) {
      this.history.pop();
      this.state = cloneDeep(this.history[this.history.length - 1]);
    }
  }
}
```
