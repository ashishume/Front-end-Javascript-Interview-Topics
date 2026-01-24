# Lodash Once() Implementation in JavaScript

## Overview
Lodash's `once()` function creates a function that can only be called once. Subsequent calls to the returned function will return the result from the first call without executing the original function again. This is useful for initialization, caching expensive operations, and ensuring functions run only once.

## Basic Implementation

```javascript
/** Polyfill for lodash once() in lodash
 * Even if you call a function multiple times it should be called only once
 */
function once(func, context) {
    let ran;
    return function () {
      if (func) {
        ran = func.apply(context || this, arguments);
        func = null;
      }
      return ran;
    };
}

// Usage
const printHello = once((a, b) => console.log("Hello Ashish", a, b));
printHello(1, 2);  // Prints: "Hello Ashish 1 2"
printHello(1, 2);  // No output (function already executed)
printHello();      // No output
printHello();      // No output
// Output: prints only one time
```

## Enhanced Implementation

### With Reset Capability
```javascript
function onceWithReset(func, context) {
  let ran;
  let executed = false;
  let originalFunc = func;
  
  const wrapped = function(...args) {
    if (!executed) {
      ran = originalFunc.apply(context || this, args);
      executed = true;
    }
    return ran;
  };
  
  wrapped.reset = function() {
    executed = false;
    ran = undefined;
  };
  
  wrapped.hasRun = function() {
    return executed;
  };
  
  return wrapped;
}
```

### With Arguments Tracking
```javascript
function once(func, context) {
  let result;
  let executed = false;
  let lastArgs;
  
  return function(...args) {
    if (!executed) {
      lastArgs = args;
      result = func.apply(context || this, args);
      executed = true;
    }
    return result;
  };
}
```

## Complete Implementation

```javascript
function once(func) {
  let result;
  let called = false;
  
  return function(...args) {
    if (!called) {
      result = func.apply(this, args);
      called = true;
    }
    return result;
  };
}
```

## Use Cases

### 1. Initialization
```javascript
const initializeApp = once(() => {
  console.log("Initializing app...");
  // Expensive initialization
  setupDatabase();
  loadConfig();
  initializeServices();
});

// Safe to call multiple times
initializeApp();
initializeApp(); // Won't execute again
initializeApp(); // Won't execute again
```

### 2. Event Handlers
```javascript
const handleFirstClick = once(() => {
  console.log("First click!");
  showWelcomeMessage();
});

button.addEventListener("click", handleFirstClick);
// Only shows welcome message on first click
```

### 3. Expensive Computations
```javascript
const expensiveCalculation = once(() => {
  console.log("Computing...");
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  return result;
});

console.log(expensiveCalculation()); // Computes
console.log(expensiveCalculation()); // Returns cached result instantly
```

### 4. API Calls
```javascript
const fetchUserData = once(async () => {
  const response = await fetch("/api/user");
  return response.json();
});

// Safe to call multiple times
const user1 = await fetchUserData();
const user2 = await fetchUserData(); // Returns cached result
```

### 5. Singleton Pattern
```javascript
const getInstance = once(() => {
  return {
    config: loadConfig(),
    cache: new Map()
  };
});

const instance1 = getInstance();
const instance2 = getInstance();
console.log(instance1 === instance2); // true (same instance)
```

## Advanced Patterns

### Once with Condition
```javascript
function onceIf(condition, func) {
  let executed = false;
  
  return function(...args) {
    if (!executed && condition()) {
      executed = true;
      return func.apply(this, args);
    }
  };
}

// Only execute once if user is logged in
const showWelcome = onceIf(
  () => isLoggedIn(),
  () => console.log("Welcome!")
);
```

### Once Per Key
```javascript
function oncePerKey(func) {
  const cache = new Map();
  
  return function(key, ...args) {
    if (!cache.has(key)) {
      cache.set(key, func.apply(this, args));
    }
    return cache.get(key);
  };
}

// Usage
const fetchUser = oncePerKey(async (userId) => {
  return fetch(`/api/users/${userId}`).then(r => r.json());
});

await fetchUser(1); // Fetches user 1
await fetchUser(2); // Fetches user 2
await fetchUser(1); // Returns cached user 1
```

### Once with Timeout
```javascript
function onceWithTimeout(func, timeout) {
  let result;
  let executed = false;
  let timeoutId;
  
  return function(...args) {
    if (!executed) {
      result = func.apply(this, args);
      executed = true;
      
      timeoutId = setTimeout(() => {
        executed = false;
        result = undefined;
      }, timeout);
    }
    
    return result;
  };
}
```

## React Hook Example

```javascript
import { useRef } from 'react';

function useOnce(callback) {
  const hasRun = useRef(false);
  const result = useRef();
  
  if (!hasRun.current) {
    result.current = callback();
    hasRun.current = true;
  }
  
  return result.current;
}

// Usage
function Component() {
  const data = useOnce(() => {
    console.log("Fetching data...");
    return fetchData();
  });
  
  return <div>{data}</div>;
}
```

## Comparison with Other Patterns

### vs Memoization
```javascript
// Memoization: Caches based on arguments
const memoized = memoize(expensiveFunc);
memoized(1); // Computes
memoized(2); // Computes (different arg)
memoized(1); // Returns cached

// Once: Always returns first result
const onceFunc = once(expensiveFunc);
onceFunc(1); // Computes
onceFunc(2); // Returns first result (ignores new arg)
```

### vs Singleton
```javascript
// Singleton: One instance
class Singleton {
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

// Once: One execution
const init = once(() => new MyClass());
```

## Best Practices

1. **Use for Initialization**: Perfect for one-time setup
2. **Expensive Operations**: Cache results of expensive calls
3. **Event Handlers**: Ensure handlers run only once
4. **API Calls**: Prevent duplicate requests
5. **Memory Management**: Be aware of cached results
6. **Testing**: Easy to test - always returns same result

## Common Patterns

### Pattern 1: Lazy Initialization
```javascript
const getConfig = once(() => {
  return loadConfigFromFile();
});
```

### Pattern 2: Event Subscription
```javascript
const subscribe = once(() => {
  eventEmitter.on("event", handleEvent);
});
```

### Pattern 3: Feature Detection
```javascript
const checkFeature = once(() => {
  return "feature" in window;
});
```

## Real-World Example

```javascript
class AppInitializer {
  constructor() {
    this.init = once(() => {
      this.setupDatabase();
      this.loadConfig();
      this.initializeServices();
      console.log("App initialized");
    });
  }
  
  setupDatabase() {
    // Database setup
  }
  
  loadConfig() {
    // Config loading
  }
  
  initializeServices() {
    // Service initialization
  }
  
  start() {
    this.init(); // Safe to call multiple times
  }
}

// Usage
const app = new AppInitializer();
app.start();
app.start(); // Won't reinitialize
app.start(); // Won't reinitialize
```
