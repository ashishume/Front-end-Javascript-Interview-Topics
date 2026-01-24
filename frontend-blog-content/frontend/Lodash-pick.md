# Lodash pick() Implementation in JavaScript

## Overview
Lodash's `pick()` function creates a new object composed of the picked object properties. It allows you to select specific properties from an object, including nested properties, creating a subset of the original object.

## Basic Implementation

```javascript
/** 
 * lodash pick()
 * Create a new object by picking some keys
 */

function LodashPick(object, keys) {
  if (!object || typeof object !== "object") {
    return {}; // If object is not provided or is not an object, return an empty object
  }
  const result = {};

  for (let key of keys) {
    let currentObj = object;
    const keyParts = key.split("."); // Split the key by dot to handle nested properties
    let nestedResult = result;

    for (let i = 0; i < keyParts.length; i++) {
      const keyPart = keyParts[i];
      if (
        currentObj &&
        typeof currentObj === "object" &&
        currentObj.hasOwnProperty(keyPart)
      ) {
        currentObj = currentObj[keyPart]; // Traverse nested properties if the property exists
        if (i === keyParts.length - 1) {
          nestedResult[keyPart] = currentObj; // Set the final property in the result object
        } else {
          nestedResult[keyPart] = nestedResult[keyPart] || {}; // Create nested object if it doesn't exist
          nestedResult = nestedResult[keyPart]; // Move to the next nested level
        }
      } else {
        break; // If any intermediate property is undefined or does not exist, break
      }
    }
  }

  return result;
}

// Example usage
const sourceObject = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    zip: "10001",
    details: {
      street: "123 Main St",
      country: "USA",
    },
  },
};

// Pick specific nested properties from the source object
const pickedObject = LodashPick(sourceObject, [
  "name",
  "address.details.street",
  "address.details.country",
]);

console.log(pickedObject);
// {
//   name: "John",
//   address: {
//     details: {
//       street: "123 Main St",
//       country: "USA"
//     }
//   }
// }
```

## Enhanced Implementation

### Simple Pick (No Nested)
```javascript
function pickSimple(object, keys) {
  if (!object || typeof object !== "object") {
    return {};
  }
  
  const result = {};
  const keyArray = Array.isArray(keys) ? keys : [keys];
  
  for (const key of keyArray) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  
  return result;
}
```

### With Function Predicate
```javascript
function pickBy(object, predicate) {
  if (!object || typeof object !== "object") {
    return {};
  }
  
  const result = {};
  
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (predicate(value, key)) {
        result[key] = value;
      }
    }
  }
  
  return result;
}

// Usage: Pick all string values
const picked = pickBy(obj, (value) => typeof value === "string");
```

## Complete Implementation

```javascript
function lodashPick(object, paths) {
  if (object == null) {
    return {};
  }
  
  const result = {};
  const pathArray = Array.isArray(paths) ? paths : [paths];
  
  for (const path of pathArray) {
    const value = getNestedValue(object, path);
    if (value !== undefined) {
      setNestedValue(result, path, value);
    }
  }
  
  return result;
}

function getNestedValue(object, path) {
  const keys = String(path).split(".");
  let current = object;
  
  for (const key of keys) {
    if (current == null || typeof current !== "object") {
      return undefined;
    }
    current = current[key];
  }
  
  return current;
}

function setNestedValue(object, path, value) {
  const keys = String(path).split(".");
  let current = object;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}
```

## Use Cases

### 1. API Response Filtering
```javascript
const apiResponse = {
  id: 123,
  name: "John",
  email: "john@example.com",
  password: "secret",
  metadata: { role: "admin" }
};

// Only send safe fields
const safeResponse = lodashPick(apiResponse, [
  "id",
  "name",
  "email",
  "metadata.role"
]);
```

### 2. Form Data Selection
```javascript
const formData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York"
  }
};

// Pick only required fields
const requiredFields = lodashPick(formData, [
  "firstName",
  "lastName",
  "email",
  "address.city"
]);
```

### 3. Object Transformation
```javascript
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-02"
};

// Create summary object
const summary = lodashPick(user, ["id", "name", "email"]);
```

### 4. State Management
```javascript
const state = {
  user: { name: "John", id: 1 },
  settings: { theme: "dark" },
  cache: { data: [] }
};

// Pick only user-related state
const userState = lodashPick(state, ["user"]);
```

## Related Functions

### omit() - Opposite of pick
```javascript
function lodashOmit(object, paths) {
  const picked = lodashPick(object, paths);
  const result = {};
  
  for (const key in object) {
    if (object.hasOwnProperty(key) && !(key in picked)) {
      result[key] = object[key];
    }
  }
  
  return result;
}
```

### pickBy() - Pick with condition
```javascript
function lodashPickBy(object, predicate) {
  const result = {};
  
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (predicate(value, key)) {
        result[key] = value;
      }
    }
  }
  
  return result;
}

// Usage
const numbers = { a: 1, b: 2, c: "hello" };
const numbersOnly = lodashPickBy(numbers, (value) => typeof value === "number");
```

## Best Practices

1. **Use for Data Sanitization**: Remove sensitive fields
2. **API Responses**: Select only needed fields
3. **Form Handling**: Extract specific form fields
4. **Performance**: Consider shallow pick for simple cases
5. **Type Safety**: Validate object structure when needed
6. **Nested Paths**: Use dot notation for nested properties

## Common Patterns

### Pattern 1: Whitelist Fields
```javascript
const allowedFields = ["name", "email", "phone"];
const sanitized = lodashPick(user, allowedFields);
```

### Pattern 2: Nested Selection
```javascript
const selected = lodashPick(data, [
  "user.name",
  "user.email",
  "settings.theme"
]);
```

### Pattern 3: Conditional Pick
```javascript
const fields = condition 
  ? ["field1", "field2"]
  : ["field3", "field4"];
const picked = lodashPick(obj, fields);
```

## Real-World Example

```javascript
class DataSanitizer {
  static sanitizeUser(user) {
    return lodashPick(user, [
      "id",
      "name",
      "email",
      "profile.avatar",
      "profile.bio"
    ]);
  }
  
  static sanitizeAPIResponse(response, allowedFields) {
    return lodashPick(response, allowedFields);
  }
  
  static createSummary(data, summaryFields) {
    return lodashPick(data, summaryFields);
  }
}

// Usage
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  password: "secret",
  profile: {
    avatar: "avatar.jpg",
    bio: "Developer"
  }
};

const sanitized = DataSanitizer.sanitizeUser(user);
// { id: 1, name: "John", email: "john@example.com", profile: { avatar: "avatar.jpg", bio: "Developer" } }
```
