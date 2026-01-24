# Lodash Insert/Set Implementation in JavaScript

## Overview
Lodash's `set()` function (also known as `insert()`) sets the value at a given path in an object, creating nested objects and arrays as needed. This is useful for dynamically setting deeply nested properties without manually creating the entire path structure.

## Basic Implementation

```javascript
/** lodash insert() or lodash set() */

// Expected output:
// const x = {
//   a: [
//     {
//       b: {
//         c: 4,
//       },
//     },
//   ],
// };

function setObj(obj, path, val) {
  /* Remove all the brackets and replace them with dot(.) */
  const pathArr = !Array.isArray(path)
    ? path.replaceAll("[", ".").replaceAll("]", "").split(".")
    : path; // ["a","0","b","c"]
  return helper(obj, pathArr, val);
}

function helper(obj, pathArr, val) {
  /** Get the current value and spread the remaining array values */
  const [curr, ...rest] = pathArr;
  if (rest?.length > 0) {
    /** If current obj doesn't exist then create one, if number then array else object */
    if (!obj[curr]) {
      // `${+rest[0]}` converts the string to numeric value
      const isNumber = `${+rest[0]}` === rest[0];
      obj[curr] = isNumber ? [] : {};
    }

    /** If current object is already present then, call helper recursively */
    if (typeof obj[curr] === "object") {
      const isNumber = `${+rest[0]}` === rest[0];
      obj[curr] = helper(isNumber ? [] : {}, rest, val);
    } else {
      obj[curr] = helper(obj[curr], rest, val);
    }
  } else {
    obj[curr] = val;
  }
  return obj;
}

// Usage
const pathArr = "a[0].b.c";
const val = 4;
const obj = {};
console.log(setObj(obj, pathArr, val));
console.log(setObj({}, ["x", "0", "y"], val));
```

## Enhanced Implementation

### With Immutability
```javascript
function setImmutable(obj, path, value) {
  const pathArray = Array.isArray(path)
    ? path
    : String(path).replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  
  if (pathArray.length === 0) {
    return value;
  }
  
  const [key, ...rest] = pathArray;
  const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
  
  if (rest.length === 0) {
    newObj[key] = value;
  } else {
    newObj[key] = setImmutable(
      newObj[key] || (isNumeric(rest[0]) ? [] : {}),
      rest,
      value
    );
  }
  
  return newObj;
}

function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}
```

### Complete Implementation
```javascript
function lodashSet(object, path, value) {
  if (object == null) {
    return object;
  }
  
  // Normalize path
  const pathArray = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, ".$1")
        .replace(/\["([^"]+)"\]/g, ".$1")
        .split(".")
        .filter(Boolean);
  
  if (pathArray.length === 0) {
    return object;
  }
  
  let current = object;
  
  // Navigate/create path
  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    const nextKey = pathArray[i + 1];
    
    // Create nested structure if needed
    if (current[key] == null) {
      current[key] = isNumeric(nextKey) ? [] : {};
    } else if (typeof current[key] !== "object") {
      // Overwrite if not an object
      current[key] = isNumeric(nextKey) ? [] : {};
    }
    
    current = current[key];
  }
  
  // Set final value
  const finalKey = pathArray[pathArray.length - 1];
  current[finalKey] = value;
  
  return object;
}

function isNumeric(str) {
  return /^\d+$/.test(String(str));
}
```

## Use Cases

### 1. Dynamic Object Creation
```javascript
const obj = {};
lodashSet(obj, "user.profile.name", "John");
lodashSet(obj, "user.profile.age", 30);
// { user: { profile: { name: "John", age: 30 } } }
```

### 2. Array Index Setting
```javascript
const obj = {};
lodashSet(obj, "items[0].name", "Item 1");
lodashSet(obj, "items[0].price", 100);
// { items: [{ name: "Item 1", price: 100 }] }
```

### 3. Configuration Objects
```javascript
const config = {};
lodashSet(config, "api.baseUrl", "https://api.example.com");
lodashSet(config, "api.timeout", 5000);
lodashSet(config, "ui.theme", "dark");
```

## Best Practices

1. **Handle Edge Cases**: null, undefined, non-objects
2. **Support Arrays**: Detect numeric keys for arrays
3. **Path Validation**: Validate path format
4. **Immutability**: Consider immutable version for React/Redux
5. **Type Safety**: Ensure correct types are created
