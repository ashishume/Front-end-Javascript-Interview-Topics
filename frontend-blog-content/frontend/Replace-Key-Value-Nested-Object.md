# Replace Key-Value in Nested Object

## Overview
Replacing a key-value pair in a nested object involves recursively traversing the object structure to find and replace a specific key's value, even when nested deeply. This is useful for data transformation, configuration updates, and object manipulation.

## Basic Implementation

```javascript
const nestedObject = {
  a: {
    b: {
      c: 123,
      d: {
        e: 456,
        f: 789,
      },
    },
  },
  g: {
    h: 987,
    i: 654,
  },
};

function replaceValuefunc(obj, replaceKey, replaceValue) {
  for (let key in obj) {
    if (key === replaceKey) {
      obj[key] = replaceValue;
    } else {
      obj[key] = replaceValuefunc(obj[key], replaceKey, replaceValue);
    }
  }
  return obj;
}

console.log(replaceValuefunc(nestedObject, "e", 999));
// Replaces all occurrences of key "e" with value 999
```

## Enhanced Implementation

### Immutable Version
```javascript
function replaceKeyValueImmutable(obj, targetKey, newValue) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => replaceKeyValueImmutable(item, targetKey, newValue));
  }
  
  const result = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === targetKey) {
        result[key] = newValue;
      } else {
        result[key] = replaceKeyValueImmutable(obj[key], targetKey, newValue);
      }
    }
  }
  
  return result;
}
```

### Replace by Path
```javascript
function replaceByPath(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      return obj; // Path doesn't exist
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  return obj;
}
```

## Use Cases

### 1. Configuration Updates
```javascript
const config = {
  api: {
    baseUrl: "https://api.example.com",
    timeout: 5000
  }
};

const updated = replaceKeyValueImmutable(config, "timeout", 10000);
```

### 2. Data Transformation
```javascript
const data = {
  user: {
    profile: {
      email: "old@example.com"
    }
  }
};

const updated = replaceKeyValueImmutable(data, "email", "new@example.com");
```

## Best Practices

1. **Immutable Updates**: Consider immutable version for React/Redux
2. **Handle Arrays**: Support array traversal
3. **Error Handling**: Handle invalid paths
4. **Performance**: Optimize for large objects
5. **Type Safety**: Validate input types
