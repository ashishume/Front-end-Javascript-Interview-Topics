# Lodash has() Implementation in JavaScript

## Overview
Lodash's `has()` function checks if a path exists in an object. It safely navigates through nested objects and arrays to determine if a property path is accessible, returning `true` if the path exists and `false` otherwise.

## Basic Implementation

```javascript
/** lodash has() */

function LodashHas(object, pathArr) {
  const keys = Array.isArray(pathArr)
    ? pathArr
    : pathArr.replaceAll("[", ".").replaceAll("]", "").split(".");

  let current = object;

  for (let key of keys) {
    if (!current || !current.hasOwnProperty(key)) {
      return false; // If the current object is null/undefined or does not have the key, return false
    }
    current = current[key]; // Move to the next nested object
  }
  return true;
}

// Usage
let obj = {
  user: {
    name: "Ashish",
    address: {
      place: "Bengaluru",
    },
    phone: [{ primary: 123456789 }, { secondary: 444444444 }],
  },
};

console.log(LodashHas(obj, "user.address.place")); // true
console.log(LodashHas(obj, ["user", "address", "place", "x"])); // false
```

## Enhanced Implementation

### With Better Path Handling
```javascript
function lodashHas(object, path) {
  if (object == null) {
    return false;
  }
  
  // Handle empty path
  if (!path || (Array.isArray(path) && path.length === 0)) {
    return true;
  }
  
  // Normalize path
  const keys = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, ".$1")
        .replace(/\["([^"]+)"\]/g, ".$1")
        .split(".")
        .filter(key => key !== "");
  
  let current = object;
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    
    if (current == null || !(key in current)) {
      return false;
    }
    
    current = current[key];
  }
  
  return true;
}
```

### With hasOwnProperty Check
```javascript
function lodashHas(object, path) {
  if (object == null) {
    return false;
  }
  
  const keys = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, ".$1")
        .split(".")
        .filter(Boolean);
  
  if (keys.length === 0) {
    return object != null;
  }
  
  let current = object;
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    
    if (current == null || !Object.prototype.hasOwnProperty.call(current, key)) {
      return false;
    }
    
    current = current[key];
  }
  
  return true;
}
```

## Complete Implementation

```javascript
function lodashHas(object, path) {
  // Handle null/undefined object
  if (object == null) {
    return false;
  }
  
  // Handle null/undefined path
  if (path == null) {
    return false;
  }
  
  // Normalize path to array
  const keys = Array.isArray(path)
    ? path.map(String)
    : String(path)
        .replace(/\[(\d+)\]/g, ".$1")
        .replace(/\["([^"]+)"\]/g, ".$1")
        .replace(/\['([^']+)'\]/g, ".$1")
        .split(".")
        .filter(Boolean);
  
  // Empty path means check if object exists
  if (keys.length === 0) {
    return object != null;
  }
  
  let current = object;
  
  // Traverse the path
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    
    // Check if current is null/undefined
    if (current == null) {
      return false;
    }
    
    // Check if key exists in current object
    // Use 'in' operator to check both own and inherited properties
    // Or use hasOwnProperty for own properties only
    if (!(key in current)) {
      return false;
    }
    
    // Move to next level
    current = current[key];
  }
  
  return true;
}
```

## Use Cases

### 1. Conditional Property Access
```javascript
if (lodashHas(user, "profile.settings.theme")) {
  const theme = user.profile.settings.theme;
  applyTheme(theme);
} else {
  applyTheme("default");
}
```

### 2. API Response Validation
```javascript
const response = await fetch("/api/data").then(r => r.json());

if (lodashHas(response, "data.items[0].id")) {
  const firstItemId = response.data.items[0].id;
  // Process item
}
```

### 3. Configuration Checking
```javascript
const config = {
  features: {
    newUI: { enabled: true }
  }
};

if (lodashHas(config, "features.newUI.enabled")) {
  enableNewUI();
}
```

### 4. Form Validation
```javascript
function validateForm(formData) {
  const errors = {};
  
  if (!lodashHas(formData, "user.email")) {
    errors.email = "Email is required";
  }
  
  if (!lodashHas(formData, "user.address.city")) {
    errors.city = "City is required";
  }
  
  return errors;
}
```

## Comparison with Other Methods

### Using Optional Chaining
```javascript
// Modern approach
const exists = user?.profile?.settings?.theme !== undefined;

// vs lodash has
const exists = lodashHas(user, "profile.settings.theme");
```

### Using try-catch
```javascript
// ❌ Verbose
let exists = false;
try {
  exists = user.profile.settings.theme !== undefined;
} catch (e) {
  exists = false;
}

// ✅ Clean
const exists = lodashHas(user, "profile.settings.theme");
```

### Using in operator
```javascript
// Only checks one level
const exists = "profile" in user && "settings" in user.profile;

// Checks entire path
const exists = lodashHas(user, "profile.settings.theme");
```

## Related Functions

### hasIn() - Check inherited properties
```javascript
function lodashHasIn(object, path) {
  if (object == null) {
    return false;
  }
  
  const keys = Array.isArray(path)
    ? path
    : String(path).split(".").filter(Boolean);
  
  let current = object;
  
  for (const key of keys) {
    if (current == null) {
      return false;
    }
    // Check in prototype chain
    if (!(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
}
```

### hasPath() - Alias for has
```javascript
const lodashHasPath = lodashHas;
```

## Performance Optimization

### Cached Path Parsing
```javascript
const pathCache = new Map();

function parsePath(path) {
  if (pathCache.has(path)) {
    return pathCache.get(path);
  }
  
  const keys = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, ".$1")
        .split(".")
        .filter(Boolean);
  
  pathCache.set(path, keys);
  return keys;
}

function lodashHas(object, path) {
  if (object == null) {
    return false;
  }
  
  const keys = parsePath(path);
  let current = object;
  
  for (const key of keys) {
    if (current == null || !(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
}
```

## Best Practices

1. **Use Before Access**: Check existence before accessing
2. **Meaningful Paths**: Use descriptive path strings
3. **Handle Arrays**: Use bracket notation for array indices
4. **Performance**: Cache parsed paths for repeated checks
5. **Type Safety**: Validate object type before checking
6. **Default Values**: Combine with get() for safe access

## Common Patterns

### Pattern 1: Safe Access Pattern
```javascript
if (lodashHas(obj, "path.to.value")) {
  const value = obj.path.to.value;
  // Use value safely
}
```

### Pattern 2: Multiple Checks
```javascript
const hasAll = lodashHas(obj, "a") && 
               lodashHas(obj, "b") && 
               lodashHas(obj, "c");
```

### Pattern 3: Conditional Logic
```javascript
const value = lodashHas(obj, "path1") 
  ? obj.path1 
  : lodashHas(obj, "path2") 
    ? obj.path2 
    : defaultValue;
```

## Real-World Example

```javascript
class DataValidator {
  static validateUserData(userData) {
    const required = [
      "user.name",
      "user.email",
      "user.address.city",
      "user.contacts[0].phone"
    ];
    
    const missing = required.filter(path => !lodashHas(userData, path));
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(", ")}`);
    }
    
    return true;
  }
  
  static hasOptionalFeature(config, feature) {
    return lodashHas(config, `features.${feature}.enabled`);
  }
}

// Usage
try {
  DataValidator.validateUserData(userData);
} catch (error) {
  console.error("Validation failed:", error.message);
}
```
