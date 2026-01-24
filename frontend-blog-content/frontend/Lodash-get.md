# Lodash get() Implementation in JavaScript

## Overview
Lodash's `get()` function safely retrieves nested object properties using a path string or array. It returns a default value if the path doesn't exist, preventing errors when accessing deeply nested properties that might be undefined.

## Basic Implementation

```javascript
//Lodash get()

let obj = {
  user: {
    name: "Ashish",
    address: {
      place: "Bengaluru",
    },
    phone: [{ primary: 123456789 }, { secondary: 444444444 }],
  },
};

function lodashGet(object, path, defaultValue) {
  if (object === undefined || object === null) {
    return defaultValue;
  }

  const keys = !Array.isArray(path)
    ? path.replaceAll("[", ".").replaceAll("]", "").split(".")
    : path;
  let current = object;

  for (let key of keys) {
    if (current === undefined || current === null) {
      return defaultValue;
    }
    current = current[key];
  }

  return current;
}

// Usage
console.log(lodashGet(obj, "user.phone[0].primary", "Debnath"));
console.log(lodashGet(obj, ["user", "address", "place"], "Debnath"));
```

## Enhanced Implementation

### Handling Empty Strings and Edge Cases
```javascript
function lodashGet(object, path, defaultValue) {
  if (object === null || object === undefined) {
    return defaultValue;
  }
  
  // Handle empty path
  if (!path || (Array.isArray(path) && path.length === 0)) {
    return object;
  }
  
  // Normalize path
  const keys = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, ".$1")
        .split(".")
        .filter(key => key !== "");
  
  let current = object;
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    
    if (current === null || current === undefined) {
      return defaultValue;
    }
    
    current = current[key];
  }
  
  return current === undefined ? defaultValue : current;
}
```

### With Type Checking
```javascript
function lodashGet(object, path, defaultValue) {
  // Handle null/undefined object
  if (object == null) {
    return defaultValue;
  }
  
  // Handle invalid path
  if (path == null) {
    return object;
  }
  
  // Convert path to array
  const keys = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, ".$1")
        .replace(/\["([^"]+)"\]/g, ".$1")
        .replace(/\['([^']+)'\]/g, ".$1")
        .split(".")
        .filter(Boolean);
  
  if (keys.length === 0) {
    return object;
  }
  
  let result = object;
  
  for (const key of keys) {
    if (result == null) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result === undefined ? defaultValue : result;
}
```

## Advanced Features

### With Function Path
```javascript
function lodashGet(object, path, defaultValue) {
  if (typeof path === "function") {
    return path(object) ?? defaultValue;
  }
  
  // ... rest of implementation
}
```

### With Custom Separator
```javascript
function lodashGet(object, path, defaultValue, separator = ".") {
  if (object == null) {
    return defaultValue;
  }
  
  const keys = Array.isArray(path)
    ? path
    : String(path).split(separator).filter(Boolean);
  
  let current = object;
  for (const key of keys) {
    if (current == null) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current === undefined ? defaultValue : current;
}
```

## Use Cases

### 1. Safe Property Access
```javascript
// ❌ Without lodash get - can throw error
const city = user.address.city; // Error if address is undefined

// ✅ With lodash get - safe access
const city = lodashGet(user, "address.city", "Unknown");
```

### 2. API Response Handling
```javascript
const response = await fetch("/api/user").then(r => r.json());
const email = lodashGet(response, "data.user.email", "no-email@example.com");
const phone = lodashGet(response, "data.user.phone[0].number", null);
```

### 3. Configuration Access
```javascript
const config = {
  app: {
    api: {
      baseUrl: "https://api.example.com",
      timeout: 5000
    }
  }
};

const timeout = lodashGet(config, "app.api.timeout", 3000);
const baseUrl = lodashGet(config, "app.api.baseUrl", "https://default.com");
```

### 4. Form Data Access
```javascript
const formData = {
  personal: {
    name: "John",
    contacts: [
      { type: "email", value: "john@example.com" }
    ]
  }
};

const email = lodashGet(formData, "personal.contacts[0].value", "");
```

## Comparison with Optional Chaining

### Optional Chaining (ES2020)
```javascript
// Modern approach
const city = user?.address?.city ?? "Unknown";
const phone = user?.contacts?.[0]?.number ?? null;
```

### Lodash get
```javascript
// Works in older browsers
const city = lodashGet(user, "address.city", "Unknown");
const phone = lodashGet(user, "contacts[0].number", null);
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

function lodashGet(object, path, defaultValue) {
  if (object == null) {
    return defaultValue;
  }
  
  const keys = parsePath(path);
  let current = object;
  
  for (const key of keys) {
    if (current == null) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current === undefined ? defaultValue : current;
}
```

## Related Functions

### has() - Check if path exists
```javascript
function lodashHas(object, path) {
  return lodashGet(object, path) !== undefined;
}
```

### set() - Set nested value
```javascript
function lodashSet(object, path, value) {
  const keys = Array.isArray(path)
    ? path
    : String(path).split(".").filter(Boolean);
  
  let current = object;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] == null || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return object;
}
```

## Best Practices

1. **Always Provide Default**: Use meaningful default values
2. **Use Array Paths**: For dynamic paths, use arrays
3. **Handle Null/Undefined**: Check object before accessing
4. **Cache Paths**: For frequently accessed paths
5. **Consider Optional Chaining**: Use `?.` in modern code
6. **Type Safety**: Validate return types when needed

## Common Patterns

### Pattern 1: Safe Array Access
```javascript
const firstItem = lodashGet(array, "[0]", null);
const lastItem = lodashGet(array, `[${array.length - 1}]`, null);
```

### Pattern 2: Multiple Fallbacks
```javascript
const value = lodashGet(obj, "path1", 
  lodashGet(obj, "path2", 
    lodashGet(obj, "path3", "default")));
```

### Pattern 3: Conditional Access
```javascript
const value = condition 
  ? lodashGet(obj, "path.if.true", defaultValue)
  : lodashGet(obj, "path.if.false", defaultValue);
```

## Real-World Example

```javascript
class ConfigManager {
  constructor(config) {
    this.config = config;
  }
  
  get(path, defaultValue) {
    return lodashGet(this.config, path, defaultValue);
  }
  
  getNested(paths) {
    return paths.map(path => lodashGet(this.config, path));
  }
  
  has(path) {
    return lodashGet(this.config, path) !== undefined;
  }
}

// Usage
const configManager = new ConfigManager({
  api: { baseUrl: "https://api.example.com" },
  ui: { theme: "dark" }
});

const baseUrl = configManager.get("api.baseUrl", "https://default.com");
const theme = configManager.get("ui.theme", "light");
```
