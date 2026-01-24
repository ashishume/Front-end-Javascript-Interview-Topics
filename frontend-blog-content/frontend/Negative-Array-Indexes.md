# Negative Array Indexes using Proxy in JavaScript

## Overview
JavaScript arrays don't natively support negative indexing (like Python), but you can implement this feature using Proxy. Negative indexes allow you to access array elements from the end, where `-1` refers to the last element, `-2` to the second-to-last, and so on.

## Basic Implementation

```javascript
/**
 * PROXY
 * NOTE: In JavaScript, a proxy is an object that wraps another object (known as the target) and 
 * intercepts operations like property lookup, assignment, function invocation, etc. 
 * This interception allows you to customize or control the behavior of these operations.
 *
 * REFLECT
 * In JavaScript, Reflect is an object that provides methods for interceptable JavaScript operations. 
 * It's essentially a collection of utility functions for working with objects and performing meta-programming tasks. 
 * These methods are typically used with proxies to customize or control the behavior of objects.
 */

function createNegativeIndexArray(array) {
  return new Proxy(array, {
    get: function(target, prop, receiver) {
      // Convert negative indices to positive indices
      const index = parseInt(prop);
      const positiveIndex = index < 0 ? target.length + index : index;
      
      // Return the value at the positive index
      return Reflect.get(target, positiveIndex, receiver);
    },
    set: function(target, prop, value, receiver) {
      // Convert negative indices to positive indices
      const index = parseInt(prop);
      const positiveIndex = index < 0 ? target.length + index : index;
      
      // Set the value at the positive index
      return Reflect.set(target, positiveIndex, value, receiver);
    }
  });
}

// Example usage:
const arr = createNegativeIndexArray([1, 2, 3, 4, 5]);

console.log(arr[-1]); // Output: 5 (last element)
console.log(arr[-2]); // Output: 4 (second to last element)

arr[-1] = 10; // Set last element to 10
console.log(arr); // Output: [1, 2, 3, 4, 10]
```

## Enhanced Implementation

```javascript
function createNegativeIndexArray(array) {
  return new Proxy(array, {
    get(target, prop, receiver) {
      // Handle numeric indices
      if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
        const index = parseInt(prop);
        const positiveIndex = index < 0 ? target.length + index : index;
        
        // Bounds checking
        if (positiveIndex < 0 || positiveIndex >= target.length) {
          return undefined;
        }
        
        return Reflect.get(target, positiveIndex, receiver);
      }
      
      // Handle array methods and properties
      if (prop === 'length' || typeof target[prop] === 'function') {
        return Reflect.get(target, prop, receiver);
      }
      
      return Reflect.get(target, prop, receiver);
    },
    
    set(target, prop, value, receiver) {
      // Handle numeric indices
      if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
        const index = parseInt(prop);
        const positiveIndex = index < 0 ? target.length + index : index;
        
        // Bounds checking
        if (positiveIndex < 0 || positiveIndex >= target.length) {
          return false;
        }
        
        return Reflect.set(target, positiveIndex, value, receiver);
      }
      
      // Handle length and other properties
      return Reflect.set(target, prop, value, receiver);
    },
    
    has(target, prop) {
      if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
        const index = parseInt(prop);
        const positiveIndex = index < 0 ? target.length + index : index;
        return positiveIndex >= 0 && positiveIndex < target.length;
      }
      return Reflect.has(target, prop);
    },
    
    ownKeys(target) {
      return Reflect.ownKeys(target);
    }
  });
}
```

## Class-Based Implementation

```javascript
class NegativeIndexArray extends Array {
  constructor(...items) {
    super(...items);
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
          const index = parseInt(prop);
          const positiveIndex = index < 0 ? target.length + index : index;
          
          if (positiveIndex < 0 || positiveIndex >= target.length) {
            return undefined;
          }
          
          return Reflect.get(target, positiveIndex, receiver);
        }
        
        return Reflect.get(target, prop, receiver);
      },
      
      set(target, prop, value, receiver) {
        if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
          const index = parseInt(prop);
          const positiveIndex = index < 0 ? target.length + index : index;
          
          if (positiveIndex < 0 || positiveIndex >= target.length) {
            return false;
          }
          
          return Reflect.set(target, positiveIndex, value, receiver);
        }
        
        return Reflect.set(target, prop, value, receiver);
      }
    });
  }
}

// Usage
const arr = new NegativeIndexArray(1, 2, 3, 4, 5);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4
```

## Advanced Features

### 1. Support for Array Methods
```javascript
function createAdvancedNegativeArray(array) {
  return new Proxy(array, {
    get(target, prop, receiver) {
      // Handle negative indices
      if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
        const index = parseInt(prop);
        const positiveIndex = index < 0 ? target.length + index : index;
        
        if (positiveIndex >= 0 && positiveIndex < target.length) {
          return Reflect.get(target, positiveIndex, receiver);
        }
        return undefined;
      }
      
      // Preserve array methods
      const value = Reflect.get(target, prop, receiver);
      
      // If it's a method, bind it to the proxy
      if (typeof value === 'function') {
        return value.bind(target);
      }
      
      return value;
    },
    
    set(target, prop, value, receiver) {
      if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
        const index = parseInt(prop);
        const positiveIndex = index < 0 ? target.length + index : index;
        
        if (positiveIndex >= 0 && positiveIndex < target.length) {
          return Reflect.set(target, positiveIndex, value, receiver);
        }
        return false;
      }
      
      return Reflect.set(target, prop, value, receiver);
    }
  });
}
```

### 2. Slice with Negative Indices
```javascript
function createNegativeSliceArray(array) {
  const proxy = new Proxy(array, {
    get(target, prop, receiver) {
      if (prop === 'slice') {
        return function(start, end) {
          // Convert negative indices
          const len = target.length;
          const startIndex = start < 0 ? len + start : start;
          const endIndex = end < 0 ? len + end : end;
          
          return Array.prototype.slice.call(target, startIndex, endIndex);
        };
      }
      
      if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
        const index = parseInt(prop);
        const positiveIndex = index < 0 ? target.length + index : index;
        return Reflect.get(target, positiveIndex, receiver);
      }
      
      return Reflect.get(target, prop, receiver);
    }
  });
  
  return proxy;
}

const arr = createNegativeSliceArray([1, 2, 3, 4, 5]);
console.log(arr.slice(-3, -1)); // [3, 4]
```

## Use Cases

### 1. Accessing Last Elements
```javascript
const arr = createNegativeIndexArray([1, 2, 3, 4, 5]);
const last = arr[-1]; // 5
const secondLast = arr[-2]; // 4
```

### 2. Circular Array Access
```javascript
function createCircularArray(array) {
  return new Proxy(array, {
    get(target, prop, receiver) {
      if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
        const index = parseInt(prop);
        let positiveIndex = index < 0 ? target.length + index : index;
        positiveIndex = ((positiveIndex % target.length) + target.length) % target.length;
        return Reflect.get(target, positiveIndex, receiver);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}

const circular = createCircularArray([1, 2, 3]);
console.log(circular[-1]); // 3
console.log(circular[-4]); // 3 (wraps around)
```

### 3. String-like Array Access
```javascript
const arr = createNegativeIndexArray(['a', 'b', 'c', 'd']);
console.log(arr[-1]); // 'd'
console.log(arr[-2]); // 'c'
```

## Comparison with Python

### Python (Native Support)
```python
arr = [1, 2, 3, 4, 5]
print(arr[-1])  # 5
print(arr[-2])  # 4
```

### JavaScript (With Proxy)
```javascript
const arr = createNegativeIndexArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4
```

## Performance Considerations

1. **Proxy Overhead**: Proxy adds some overhead compared to direct array access
2. **Index Conversion**: Converting negative to positive indices is fast
3. **Bounds Checking**: Additional checks may impact performance for large arrays
4. **Use Cases**: Best for convenience, not performance-critical code

## Best Practices

1. **Bounds Checking**: Always validate indices to prevent errors
2. **Type Checking**: Verify that the property is a numeric string
3. **Preserve Methods**: Ensure array methods still work correctly
4. **Documentation**: Clearly document that negative indices are supported
5. **Testing**: Test edge cases like empty arrays, single elements, etc.

## Limitations

1. **Performance**: Slight performance overhead due to Proxy
2. **Compatibility**: Requires Proxy support (all modern browsers)
3. **Method Binding**: Some array methods may need special handling
4. **Type Checking**: `Array.isArray()` may not work as expected

## Real-World Example

```javascript
class NegativeArray {
  constructor(...items) {
    this.items = items;
    return this.createProxy();
  }
  
  createProxy() {
    return new Proxy(this.items, {
      get: (target, prop) => {
        if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
          const index = parseInt(prop);
          const posIndex = index < 0 ? target.length + index : index;
          return target[posIndex];
        }
        return target[prop];
      },
      
      set: (target, prop, value) => {
        if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
          const index = parseInt(prop);
          const posIndex = index < 0 ? target.length + index : index;
          target[posIndex] = value;
          return true;
        }
        target[prop] = value;
        return true;
      }
    });
  }
}

// Usage
const arr = new NegativeArray(1, 2, 3, 4, 5);
console.log(arr[-1]); // 5
arr[-1] = 10;
console.log(arr); // [1, 2, 3, 4, 10]
```
