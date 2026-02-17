# Invert Object Key-Value in JavaScript

## Overview
Inverting an object means swapping keys and values, where the original values become keys and the original keys become values. This is useful for creating lookup tables, reversing mappings, and transforming data structures. Special consideration must be given to handling duplicate values.

## Basic Implementation

```javascript
/**
 * Given an object make the keys as values and values as keys.
 * Definitely have to handle duplicates and make an assumption that it's values are only String.
 * Must use .reduce()
 */
const obj = {
  key1: "value1",
  key2: "value2",
  key3: "value1",
  key4: "value3",
};

/** Invert an object using array.reduce() */
function invertObject(obj) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    // If the value already exists as a key in the result object
    // Convert it to an array if it's not already one, and add the new key
    if (result.hasOwnProperty(value)) {
      if (!Array.isArray(result[value])) {
        result[value] = [result[value], key];
      } else {
        result[value].push(key);
      }
    } else {
      // Otherwise, create a new entry with the swapped key-value pair
      result[value] = key;
    }
    return result;
  }, {});
}

console.log(obj); // original object
console.log(invertObject(obj)); // inverted
/**
  {
    "value1": [
        "key1",
        "key3"
    ],
    "value2": "key2",
    "value3": "key4"
}
 */
```

## Simple Inversion (No Duplicate Handling)

```javascript
function invertObjectSimple(obj) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[value] = key;
    return result;
  }, {});
}

// Note: This will overwrite duplicate values
const obj = { a: 1, b: 2, c: 1 };
console.log(invertObjectSimple(obj)); // { 1: 'c', 2: 'b' } (a is lost)
```

## Advanced Implementations

### With Type Checking
```javascript
function invertObjectSafe(obj) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    // Only invert if value is a valid key type
    if (typeof value === 'string' || typeof value === 'number') {
      if (result.hasOwnProperty(value)) {
        if (!Array.isArray(result[value])) {
          result[value] = [result[value], key];
        } else {
          result[value].push(key);
        }
      } else {
        result[value] = key;
      }
    }
    return result;
  }, {});
}
```

### Preserving Original Keys as Array
```javascript
function invertObjectAlwaysArray(obj) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (!result[value]) {
      result[value] = [];
    }
    result[value].push(key);
    return result;
  }, {});
}

// Always returns arrays, even for single values
const inverted = invertObjectAlwaysArray(obj);
// {
//   "value1": ["key1", "key3"],
//   "value2": ["key2"],
//   "value3": ["key4"]
// }
```

### Bidirectional Mapping
```javascript
function createBidirectionalMap(obj) {
  const forward = { ...obj };
  const reverse = invertObject(obj);
  
  return {
    forward,
    reverse,
    get(key) {
      return this.forward[key] || this.reverse[key];
    },
    set(key, value) {
      this.forward[key] = value;
      this.reverse[value] = key;
    }
  };
}
```

## Use Cases

### 1. Reverse Lookup Table
```javascript
const statusCodes = {
  pending: 1,
  processing: 2,
  completed: 3,
  cancelled: 4
};

const inverted = invertObject(statusCodes);
// { 1: 'pending', 2: 'processing', 3: 'completed', 4: 'cancelled' }

// Now you can lookup status by code
console.log(inverted[1]); // 'pending'
```

### 2. Category Mapping
```javascript
const categoryMap = {
  'electronics': 'cat1',
  'clothing': 'cat2',
  'books': 'cat3'
};

const codeToCategory = invertObject(categoryMap);
// { cat1: 'electronics', cat2: 'clothing', cat3: 'books' }
```

### 3. Language Translation
```javascript
const translations = {
  'hello': 'hola',
  'goodbye': 'adios',
  'thank you': 'gracias'
};

const reverseTranslations = invertObject(translations);
// { hola: 'hello', adios: 'goodbye', gracias: 'thank you' }
```

### 4. URL Parameter Mapping
```javascript
const routeParams = {
  '/users': 'usersPage',
  '/posts': 'postsPage',
  '/settings': 'settingsPage'
};

const pageToRoute = invertObject(routeParams);
// { usersPage: '/users', postsPage: '/posts', settingsPage: '/settings' }
```

## Handling Different Value Types

### Numbers as Keys
```javascript
function invertObjectWithNumbers(obj) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      if (result.hasOwnProperty(numValue)) {
        result[numValue] = Array.isArray(result[numValue])
          ? [...result[numValue], key]
          : [result[numValue], key];
      } else {
        result[numValue] = key;
      }
    } else {
      // Handle non-numeric values
      if (result.hasOwnProperty(value)) {
        result[value] = Array.isArray(result[value])
          ? [...result[value], key]
          : [result[value], key];
      } else {
        result[value] = key;
      }
    }
    return result;
  }, {});
}
```

### Objects as Values
```javascript
function invertObjectWithObjects(obj) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    // Convert object to string for use as key
    const valueKey = JSON.stringify(value);
    
    if (result.hasOwnProperty(valueKey)) {
      if (!Array.isArray(result[valueKey])) {
        result[valueKey] = [result[valueKey], key];
      } else {
        result[valueKey].push(key);
      }
    } else {
      result[valueKey] = key;
    }
    return result;
  }, {});
}
```

## Advanced: Deep Inversion

```javascript
function deepInvertObject(obj) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively invert nested objects
      result[key] = deepInvertObject(value);
    } else {
      // Handle primitive values
      if (result.hasOwnProperty(value)) {
        if (!Array.isArray(result[value])) {
          result[value] = [result[value], key];
        } else {
          result[value].push(key);
        }
      } else {
        result[value] = key;
      }
    }
    return result;
  }, {});
}
```

## Performance Optimizations

### Using Map
```javascript
function invertObjectWithMap(obj) {
  const map = new Map();
  
  for (const [key, value] of Object.entries(obj)) {
    if (map.has(value)) {
      const existing = map.get(value);
      map.set(value, Array.isArray(existing) 
        ? [...existing, key] 
        : [existing, key]);
    } else {
      map.set(value, key);
    }
  }
  
  return Object.fromEntries(map);
}
```

## Real-World Examples

### Example 1: Status Code Lookup
```javascript
const httpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const statusByCode = invertObject(httpStatusCodes);
// { 200: 'OK', 201: 'CREATED', 400: 'BAD_REQUEST', ... }

function getStatusName(code) {
  return statusByCode[code] || 'UNKNOWN';
}
```

### Example 2: Configuration Mapping
```javascript
const envToConfig = {
  development: 'dev.config.js',
  production: 'prod.config.js',
  testing: 'test.config.js'
};

const configToEnv = invertObject(envToConfig);
// { 'dev.config.js': 'development', ... }
```

### Example 3: User Role Permissions
```javascript
const rolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read'],
  guest: []
};

// Invert to permission -> roles
const permissionRoles = {};
Object.entries(rolePermissions).forEach(([role, permissions]) => {
  permissions.forEach(permission => {
    if (!permissionRoles[permission]) {
      permissionRoles[permission] = [];
    }
    permissionRoles[permission].push(role);
  });
});
```

## Best Practices

1. **Handle Duplicates**: Always consider what to do with duplicate values
2. **Type Safety**: Ensure values are valid key types (string, number)
3. **Preserve Data**: Decide whether to use arrays or overwrite for duplicates
4. **Performance**: Use Map for large objects
5. **Validation**: Validate input object structure
6. **Documentation**: Clearly document behavior with duplicate values

## Common Pitfalls

### Pitfall 1: Losing Data with Duplicates
```javascript
// ❌ Bad: Overwrites duplicate values
function badInvert(obj) {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    acc[v] = k; // Last value wins
    return acc;
  }, {});
}

// ✅ Good: Handles duplicates
function goodInvert(obj) {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    acc[v] = acc[v] ? [...(Array.isArray(acc[v]) ? acc[v] : [acc[v]]), k] : k;
    return acc;
  }, {});
}
```

### Pitfall 2: Non-String Values
```javascript
// ❌ May cause issues with object/array values
const obj = { a: { x: 1 }, b: { x: 1 } };
invertObject(obj); // May not work as expected

// ✅ Convert to string first
function safeInvert(obj) {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    const key = typeof v === 'object' ? JSON.stringify(v) : v;
    // ... handle key
    return acc;
  }, {});
}
```

## Utility Function

```javascript
class ObjectInverter {
  static invert(obj, options = {}) {
    const {
      handleDuplicates = 'array', // 'array', 'first', 'last'
      keyTransform = (v) => v,
      valueTransform = (k) => k
    } = options;

    return Object.entries(obj).reduce((result, [key, value]) => {
      const newKey = keyTransform(value);
      const newValue = valueTransform(key);

      if (result.hasOwnProperty(newKey)) {
        switch (handleDuplicates) {
          case 'array':
            result[newKey] = Array.isArray(result[newKey])
              ? [...result[newKey], newValue]
              : [result[newKey], newValue];
            break;
          case 'last':
            result[newKey] = newValue;
            break;
          case 'first':
            // Keep existing
            break;
        }
      } else {
        result[newKey] = newValue;
      }

      return result;
    }, {});
  }
}

// Usage
const inverted = ObjectInverter.invert(obj, {
  handleDuplicates: 'array'
});
```
