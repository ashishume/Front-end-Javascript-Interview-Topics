# Module Pattern in JavaScript

The Module Pattern is a design pattern in JavaScript that allows you to group related variables and functions together into a single object, providing encapsulation and a way to create private and public members. This pattern helps organize code, prevent global namespace pollution, and create more maintainable applications.

## What is the Module Pattern?

The Module Pattern uses closures and immediately invoked function expressions (IIFE) to create private scope and expose only the public API. It's one of the most fundamental patterns in JavaScript for organizing code.

## Basic Implementation

### Simple Module Pattern

```javascript
const module = (function () {
  // Private variable
  let privateVariable = "I'm private";

  // Private function
  function privateMethod() {
    return "private method";
  }

  // Public API
  return {
    publicMethod: function () {
      console.log(privateMethod()); // Can access private method
      console.log("public");
    },
  };
})();

// Usage
module.publicMethod(); // Prints: "private method" and "public"
// module.privateMethod(); // Error: module.privateMethod is not a function
```

### Enhanced Module Pattern

```javascript
function ModulePattern() {
  const name = "Ashish";
  const age = 24;

  // Private function
  function addSomeAgeValue() {
    return 2;
  }

  // Private function that uses other private members
  function calculateAge() {
    return age + addSomeAgeValue();
  }

  // Public API
  return {
    returnName: function () {
      return name;
    },
    calculateAge, // Expose calculateAge
  };
}

const moduleMethod = new ModulePattern();
console.log(moduleMethod.returnName()); // "Ashish"
console.log(moduleMethod.calculateAge()); // 26
// console.log(moduleMethod.addSomeAgeValue()); // Error: not a function
```

## Key Concepts

### 1. Private Members

Variables and functions declared inside the module are private and cannot be accessed from outside:

```javascript
const counter = (function () {
  let count = 0; // Private variable

  return {
    increment: function () {
      count++;
    },
    getCount: function () {
      return count;
    },
  };
})();

counter.increment();
console.log(counter.getCount()); // 1
// console.log(counter.count); // undefined - private!
```

### 2. Public API

Only the returned object is accessible from outside the module:

```javascript
const calculator = (function () {
  // Private
  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  // Public
  return {
    add,
    subtract,
    // Private functions remain hidden
  };
})();

calculator.add(5, 3); // 8
// calculator.multiply is not accessible
```

### 3. Namespace Protection

Modules prevent global namespace pollution:

```javascript
// Without module pattern - pollutes global scope
let count = 0;
function increment() {
  count++;
}

// With module pattern - encapsulated
const counterModule = (function () {
  let count = 0;
  return {
    increment: () => count++,
    getCount: () => count,
  };
})();
```

## Advanced Patterns

### 1. Revealing Module Pattern

Expose private functions by reference rather than defining them in the return object:

```javascript
const userModule = (function () {
  let users = [];

  function addUser(user) {
    users.push(user);
  }

  function removeUser(id) {
    users = users.filter((user) => user.id !== id);
  }

  function getUser(id) {
    return users.find((user) => user.id === id);
  }

  function getAllUsers() {
    return users.slice(); // Return copy to prevent external modification
  }

  // Reveal only what's needed
  return {
    add: addUser,
    remove: removeUser,
    get: getUser,
    getAll: getAllUsers,
  };
})();

userModule.add({ id: 1, name: "John" });
console.log(userModule.getAll()); // [{ id: 1, name: "John" }]
```

### 2. Module with Dependencies

Pass dependencies as parameters:

```javascript
const dataModule = (function (jQuery, lodash) {
  // Use jQuery and lodash here
  function processData(data) {
    const processed = lodash.map(data, (item) => item * 2);
    jQuery("#result").text(processed.join(", "));
  }

  return {
    process: processData,
  };
})(jQuery, _); // Dependencies injected
```

### 3. Singleton Module

Ensure only one instance exists:

```javascript
const singletonModule = (function () {
  let instance;

  function createInstance() {
    return {
      data: [],
      add: function (item) {
        this.data.push(item);
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const instance1 = singletonModule.getInstance();
const instance2 = singletonModule.getInstance();
console.log(instance1 === instance2); // true - same instance
```

### 4. Module with State

Maintain state across method calls:

```javascript
const stateModule = (function () {
  let state = {
    count: 0,
    name: "Default",
  };

  function setState(newState) {
    state = { ...state, ...newState };
  }

  function getState() {
    return { ...state }; // Return copy
  }

  return {
    setState,
    getState,
  };
})();

stateModule.setState({ count: 5, name: "Updated" });
console.log(stateModule.getState()); // { count: 5, name: "Updated" }
```

## Real-World Examples

### Example 1: API Client Module

```javascript
const apiClient = (function () {
  const baseURL = "https://api.example.com";
  let token = null;

  // Private function
  function makeRequest(endpoint, options = {}) {
    const url = `${baseURL}${endpoint}`;
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  // Public API
  return {
    setToken: function (newToken) {
      token = newToken;
    },
    get: function (endpoint) {
      return makeRequest(endpoint, { method: "GET" });
    },
    post: function (endpoint, data) {
      return makeRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  };
})();

apiClient.setToken("abc123");
apiClient.get("/users").then(/* ... */);
```

### Example 2: DOM Manipulation Module

```javascript
const domUtils = (function () {
  // Private cache
  const cache = new Map();

  // Private helper
  function getCachedElement(selector) {
    if (!cache.has(selector)) {
      cache.set(selector, document.querySelector(selector));
    }
    return cache.get(selector);
  }

  // Public API
  return {
    show: function (selector) {
      const element = getCachedElement(selector);
      if (element) element.style.display = "block";
    },
    hide: function (selector) {
      const element = getCachedElement(selector);
      if (element) element.style.display = "none";
    },
    toggle: function (selector) {
      const element = getCachedElement(selector);
      if (element) {
        element.style.display =
          element.style.display === "none" ? "block" : "none";
      }
    },
  };
})();

domUtils.show("#myElement");
```

### Example 3: Configuration Module

```javascript
const config = (function () {
  const settings = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
  };

  return {
    get: function (key) {
      return settings[key];
    },
    set: function (key, value) {
      if (key in settings) {
        settings[key] = value;
      }
    },
    getAll: function () {
      return { ...settings }; // Return copy
    },
  };
})();

console.log(config.get("apiUrl")); // "https://api.example.com"
config.set("timeout", 10000);
```

## Benefits

1. **Encapsulation**: Private members are protected from external access
2. **Namespace Management**: Avoids global variable pollution
3. **Code Organization**: Groups related functionality together
4. **Maintainability**: Easier to maintain and update
5. **Reusability**: Modules can be easily reused across projects
6. **Testing**: Easier to test isolated modules

## Limitations

1. **No True Privacy**: Private members can still be accessed through debugging tools
2. **Memory**: Each module instance creates its own closure
3. **No Inheritance**: Traditional module pattern doesn't support inheritance well
4. **Testing Private Methods**: Hard to test private functions directly

## Modern Alternatives

### ES6 Modules

```javascript
// math.js
let privateVar = 0;

export function add(a, b) {
  return a + b;
}

export function getPrivateVar() {
  return privateVar;
}

// main.js
import { add, getPrivateVar } from "./math.js";
```

### Class-based Modules

```javascript
class Calculator {
  #privateField = 0; // Private field (ES2022)

  #privateMethod() {
    return "private";
  }

  publicMethod() {
    return this.#privateMethod();
  }
}
```

## Best Practices

1. **Single Responsibility**: Each module should have one clear purpose
2. **Minimal Public API**: Expose only what's necessary
3. **Documentation**: Document the public API
4. **Consistent Naming**: Use consistent naming conventions
5. **Dependency Injection**: Pass dependencies as parameters
6. **Avoid Global State**: Keep state within the module

## Comparison with Other Patterns

| Pattern        | Use Case             | Inheritance | Privacy        |
| -------------- | -------------------- | ----------- | -------------- |
| Module Pattern | Simple encapsulation | No          | Closure-based  |
| Class Pattern  | OOP-style            | Yes         | Private fields |
| ES6 Modules    | File-based modules   | No          | File scope     |

## Summary

The Module Pattern is a fundamental JavaScript pattern that provides:

- **Encapsulation** through closures
- **Private and public members**
- **Namespace protection**
- **Code organization**

While modern JavaScript offers ES6 modules and classes, the Module Pattern remains valuable for:

- Legacy codebases
- Browser compatibility
- Understanding JavaScript fundamentals
- Creating lightweight, self-contained modules

Understanding the Module Pattern is essential for writing well-organized, maintainable JavaScript code.
