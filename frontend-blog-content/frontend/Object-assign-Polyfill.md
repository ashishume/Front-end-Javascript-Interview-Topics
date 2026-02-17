# Object.assign Polyfill in JavaScript

## Overview
Object.assign() copies all enumerable own properties from one or more source objects to a target object. A polyfill implements this functionality for environments that don't support it natively, ensuring compatibility across different browsers and JavaScript engines.

## Basic Implementation

```javascript
// Object.ObjectAssign()

const tar = {
  a: 1,
  b: "targetValue",
  c: ["1", 2, 3],
};
const sour = {
  a: 5,
  b: [1, 1, 1, 1],
  d: { sa: "sourceValue" },
};

const ObjectAssign = function (target, ...sources) {
  let newObj = Object(target);
  for (let i = 0; i < sources.length; i++) {
    let nextSource = sources[i];
    if (nextSource !== null && nextSource !== undefined) {
      for (let nextKey in nextSource) {
        /** Loop through source object */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          newObj[nextKey] = nextSource[nextKey];
        }
      }
      /** Edge case to solve symbols as key property */
      for (let symbol of Object.getOwnPropertySymbols(nextSource)) {
        newObj[symbol] = nextSource[symbol];
      }
    }
  }

  return newObj;
};

const key = Symbol("a");
const a = ObjectAssign(
  {
    c: 555,
  },
  { a: 3 },
  { b: 4 }
);
console.log("custom===>", a);
```

## Complete Polyfill

```javascript
if (typeof Object.assign !== "function") {
  Object.assign = function(target, ...sources) {
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
    
    const to = Object(target);
    
    for (let index = 0; index < sources.length; index++) {
      const nextSource = sources[index];
      
      if (nextSource != null) {
        // Copy enumerable own properties
        for (const nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
        
        // Copy symbol properties
        const symbols = Object.getOwnPropertySymbols(nextSource);
        for (let i = 0; i < symbols.length; i++) {
          const symbol = symbols[i];
          if (Object.prototype.propertyIsEnumerable.call(nextSource, symbol)) {
            to[symbol] = nextSource[symbol];
          }
        }
      }
    }
    
    return to;
  };
}
```

## Key Features

1. **Copies Own Properties**: Only enumerable own properties
2. **Handles Symbols**: Copies symbol properties
3. **Multiple Sources**: Can merge multiple objects
4. **Mutates Target**: Modifies target object
5. **Returns Target**: Returns the modified target

## Use Cases

### 1. Object Merging
```javascript
const defaults = { color: "red", size: "medium" };
const userPrefs = { color: "blue" };
const config = Object.assign({}, defaults, userPrefs);
// { color: "blue", size: "medium" }
```

### 2. Shallow Clone
```javascript
const original = { a: 1, b: { c: 2 } };
const clone = Object.assign({}, original);
```

### 3. Default Values
```javascript
function createUser(options) {
  return Object.assign({
    name: "Anonymous",
    age: 0,
    active: true
  }, options);
}
```

## Best Practices

1. **Use Spread Operator**: Prefer `{...obj}` in modern code
2. **Handle Null/Undefined**: Check for null targets
3. **Shallow Copy Only**: Nested objects are referenced
4. **Use for Merging**: Perfect for configuration objects
5. **Consider Immutability**: Use with empty object for immutability
