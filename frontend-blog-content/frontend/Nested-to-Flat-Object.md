# Nested to Flat Object in JavaScript

## Overview
Converting a nested object to a flat object means transforming a hierarchical structure into a single-level object where nested keys are represented as dot-notation or bracket-notation paths. This is useful for form data, API payloads, and data transformation.

## Basic Implementation

```javascript
function findValueFromNestedObject(currObj, path) {
  const keys = path.split(".");

  let curr = currObj;
  for (let key of keys) {
    if (curr == null || !(key in curr)) {
      return undefined;
    }
    curr = curr[key];
  }
  return curr;
}

const obj = {
  A: {
    B: {
      C: {
        D: {
          E: 2,
        },
      },
    },
  },
};

console.log(findValueFromNestedObject(obj, "A.B.C.D.E"));
// Returns 2 if E exists else returns undefined
```

## Flatten Object Implementation

```javascript
function flattenObject(obj, prefix = '', result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

// Usage
const nested = {
  user: {
    name: "John",
    address: {
      city: "New York",
      zip: "10001"
    }
  }
};

const flat = flattenObject(nested);
// { "user.name": "John", "user.address.city": "New York", "user.address.zip": "10001" }
```

## Enhanced Implementation

### With Array Support
```javascript
function flattenObject(obj, prefix = '', result = {}, options = {}) {
  const {
    separator = '.',
    includeArrays = true,
    arrayNotation = 'bracket'
  } = options;
  
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    
    const value = obj[key];
    const newKey = prefix ? `${prefix}${separator}${key}` : key;
    
    if (Array.isArray(value)) {
      if (includeArrays) {
        if (arrayNotation === 'bracket') {
          value.forEach((item, index) => {
            const arrayKey = `${newKey}[${index}]`;
            if (typeof item === 'object' && item !== null) {
              flattenObject(item, arrayKey, result, options);
            } else {
              result[arrayKey] = item;
            }
          });
        } else {
          value.forEach((item, index) => {
            const arrayKey = `${newKey}${separator}${index}`;
            if (typeof item === 'object' && item !== null) {
              flattenObject(item, arrayKey, result, options);
            } else {
              result[arrayKey] = item;
            }
          });
        }
      } else {
        result[newKey] = value;
      }
    } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
      flattenObject(value, newKey, result, options);
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}
```

## Use Cases

### 1. Form Data
```javascript
const formData = {
  user: {
    name: "John",
    email: "john@example.com"
  }
};

const flatData = flattenObject(formData);
// { "user.name": "John", "user.email": "john@example.com" }
```

### 2. API Payloads
```javascript
const payload = flattenObject(complexObject);
fetch('/api/data', {
  method: 'POST',
  body: JSON.stringify(payload)
});
```

## Best Practices

1. **Handle Edge Cases**: null, undefined, arrays, dates
2. **Choose Separator**: Dot notation vs custom separator
3. **Array Handling**: Decide how to handle arrays
4. **Performance**: Consider for large objects
5. **Reversibility**: Keep structure reversible if needed
