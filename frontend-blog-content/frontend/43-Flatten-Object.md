# Flatten Object in JavaScript

Flattening an object means converting a nested object structure into a single-level object where nested keys are represented as dot-notation paths. This is a common operation when working with complex data structures, API responses, or when preparing data for storage or transmission.

## What is Object Flattening?

Given a nested object like this:

```javascript
const obj = {
  Company: "GeeksforGeeks",
  Address: "Noida",
  contact: 9999999999,
  mentor: {
    HTML: "GFG",
    CSS: "GFG",
    JavaScript: "GFG",
    abc: {
      xyz: 1,
    },
  },
};
```

Flattening it would produce:

```javascript
{
  Company: "GeeksforGeeks",
  Address: "Noida",
  contact: 9999999999,
  "mentor.HTML": "GFG",
  "mentor.CSS": "GFG",
  "mentor.JavaScript": "GFG",
  "mentor.abc.xyz": 1
}
```

## Basic Implementation

Here's a recursive function to flatten an object:

```javascript
function flattenObject(object, merger = "", result = {}) {
  for (let key in object) {
    const newKey = merger ? `${merger}.${key}` : key;

    if (typeof object[key] === "object" && object[key] !== null) {
      // Recursively flatten nested objects
      flattenObject(object[key], newKey, result);
    } else {
      // Add the key-value pair to result
      result[newKey] = object[key];
    }
  }
  return result;
}

// Usage
const obj = {
  Company: "GeeksforGeeks",
  Address: "Noida",
  contact: 9999999999,
  mentor: {
    HTML: "GFG",
    CSS: "GFG",
    JavaScript: "GFG",
    abc: {
      xyz: 1,
    },
  },
};

console.log(flattenObject(obj));
// Output:
// {
//   Company: 'GeeksforGeeks',
//   Address: 'Noida',
//   contact: 9999999999,
//   'mentor.HTML': 'GFG',
//   'mentor.CSS': 'GFG',
//   'mentor.JavaScript': 'GFG',
//   'mentor.abc.xyz': 1
// }
```

## How It Works

1. **Iterate through keys**: Loop through each key in the object
2. **Build key path**: Create a new key by combining the current path with the current key
3. **Check if nested**: If the value is an object (and not null), recursively flatten it
4. **Add to result**: If the value is a primitive, add it to the result object with the flattened key

## Handling Edge Cases

### 1. Null Values

```javascript
function flattenObject(object, merger = "", result = {}) {
  for (let key in object) {
    const newKey = merger ? `${merger}.${key}` : key;

    // Handle null explicitly
    if (object[key] === null) {
      result[newKey] = null;
    } else if (typeof object[key] === "object" && !Array.isArray(object[key])) {
      // Recursively flatten nested objects (but not arrays)
      flattenObject(object[key], newKey, result);
    } else {
      result[newKey] = object[key];
    }
  }
  return result;
}
```

### 2. Arrays

You might want to handle arrays differently:

```javascript
function flattenObject(object, merger = "", result = {}) {
  for (let key in object) {
    const newKey = merger ? `${merger}.${key}` : key;

    if (Array.isArray(object[key])) {
      // Handle arrays - you can choose to keep them as arrays
      // or flatten them with indices
      result[newKey] = object[key];

      // OR flatten with indices:
      // object[key].forEach((item, index) => {
      //   flattenObject({ [index]: item }, newKey, result);
      // });
    } else if (typeof object[key] === "object" && object[key] !== null) {
      flattenObject(object[key], newKey, result);
    } else {
      result[newKey] = object[key];
    }
  }
  return result;
}
```

### 3. Custom Separator

```javascript
function flattenObject(object, separator = ".", merger = "", result = {}) {
  for (let key in object) {
    const newKey = merger ? `${merger}${separator}${key}` : key;

    if (
      typeof object[key] === "object" &&
      object[key] !== null &&
      !Array.isArray(object[key])
    ) {
      flattenObject(object[key], separator, newKey, result);
    } else {
      result[newKey] = object[key];
    }
  }
  return result;
}

// Usage with custom separator
flattenObject(obj, "_"); // Uses underscore instead of dot
```

## Unflattening (Reverse Operation)

Sometimes you need to convert a flattened object back to a nested structure:

```javascript
function unflattenObject(flatObject) {
  const result = {};

  for (let key in flatObject) {
    const keys = key.split(".");
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!(k in current)) {
        current[k] = {};
      }
      current = current[k];
    }

    current[keys[keys.length - 1]] = flatObject[key];
  }

  return result;
}

// Usage
const flattened = {
  Company: "GeeksforGeeks",
  "mentor.HTML": "GFG",
  "mentor.abc.xyz": 1,
};

console.log(unflattenObject(flattened));
// Output:
// {
//   Company: "GeeksforGeeks",
//   mentor: {
//     HTML: "GFG",
//     abc: {
//       xyz: 1
//     }
//   }
// }
```

## Use Cases

### 1. API Data Transformation

```javascript
// Flatten API response for easier processing
const apiResponse = {
  user: {
    profile: {
      name: "John",
      email: "john@example.com",
    },
    settings: {
      theme: "dark",
    },
  },
};

const flattened = flattenObject(apiResponse);
// Easier to search, filter, or validate
```

### 2. Form Data Processing

```javascript
// Flatten form data for submission
const formData = {
  personal: {
    firstName: "John",
    lastName: "Doe",
  },
  address: {
    street: "123 Main St",
    city: "New York",
  },
};

const flatFormData = flattenObject(formData);
// Can be easily sent as query parameters or form data
```

### 3. Configuration Management

```javascript
// Flatten configuration for environment variables
const config = {
  database: {
    host: "localhost",
    port: 5432,
    credentials: {
      username: "admin",
      password: "secret",
    },
  },
};

const envVars = flattenObject(config);
// Can be converted to: DATABASE_HOST, DATABASE_PORT, etc.
```

### 4. Deep Property Access

```javascript
// Easier to access nested properties
const flattened = flattenObject(complexObject);
const value = flattened["deeply.nested.property"]; // Direct access
```

## Performance Considerations

1. **Recursion Depth**: Very deeply nested objects might cause stack overflow
2. **Object Size**: Large objects will take more time to process
3. **Memory**: Creates a new object, so consider memory usage for large objects

## Alternative Approaches

### Using Stack (Iterative)

```javascript
function flattenObjectIterative(obj) {
  const result = {};
  const stack = [{ obj, prefix: "" }];

  while (stack.length > 0) {
    const { obj: current, prefix } = stack.pop();

    for (let key in current) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof current[key] === "object" &&
        current[key] !== null &&
        !Array.isArray(current[key])
      ) {
        stack.push({ obj: current[key], prefix: newKey });
      } else {
        result[newKey] = current[key];
      }
    }
  }

  return result;
}
```

### Using Object.entries()

```javascript
function flattenObjectModern(obj, prefix = "", result = {}) {
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObjectModern(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  });

  return result;
}
```

## Best Practices

1. **Handle null/undefined**: Always check for null values
2. **Consider arrays**: Decide how to handle arrays in your use case
3. **Preserve types**: Make sure primitive types are preserved correctly
4. **Key collisions**: Be aware that flattening might create key collisions
5. **Circular references**: Handle circular references if they might exist

Flattening objects is a useful technique for simplifying complex data structures and making them easier to work with in various scenarios.
