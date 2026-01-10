# Debouncing and Throttling in JavaScript

## Overview
**Debouncing** and **Throttling** are techniques used to control how often a function is executed, especially useful for performance optimization in event handlers.

## Key Differences

### Throttling
- **Limits the rate** at which a function can be called
- Ensures a function is called **at most once** in a specified time period
- Useful for events that fire frequently like scrolling, resizing
- Example: If throttled to 1000ms, function will execute at most once per second

### Debouncing
- **Delays the execution** of a function until after a specified wait time
- **Resets the timer** every time the function is called
- Only executes after the event has **stopped firing** for the specified delay
- Useful for search inputs, form submissions
- Example: If debounced to 1000ms, function will only execute after 1 second of no calls

## Comparison Table

| Feature | Throttling | Debouncing |
|---------|-----------|------------|
| **Timing** | Guarantees execution at regular intervals | Waits for a pause in events |
| **Use Cases** | Continuous events (scroll, resize) | Discrete events (search, form submit) |
| **Execution** | May execute multiple times | Executes only once after delay |
| **Frequency** | At most once per time period | After pause in events |

## Debouncing

### Trailing Debounce (Default)
Executes the function **after** the delay period when events stop firing.

```javascript
function debounceTrailing(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

**Example:**
```javascript
const searchInput = debounceTrailing((query) => {
  console.log("Searching for:", query);
}, 300);

// User types "hello"
searchInput("h");   // Timer starts
searchInput("he");  // Timer resets
searchInput("hel"); // Timer resets
searchInput("hell"); // Timer resets
searchInput("hello"); // Timer resets
// After 300ms of no input, function executes with "hello"
```

### Leading Debounce
Executes the function **immediately** on the first call, then ignores subsequent calls until the delay period passes.

```javascript
function debounceLeading(func, delay) {
  let timeoutId;
  let called = false;
  return function (...args) {
    if (!called) {
      func.apply(this, args); // Execute immediately
      called = true;
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      called = false; // Reset after delay
    }, delay);
  };
}
```

**Example:**
```javascript
const callMethod = debounceLeading((name) => {
  console.log(name);
}, 300);

callMethod("1"); // Executes immediately
callMethod("2"); // Ignored
callMethod("3"); // Ignored
callMethod("4"); // Ignored
// After 300ms, can execute again
setTimeout(() => {
  callMethod("5"); // Executes immediately
}, 400);
// Output: 1, 5
```

## Throttling

### Leading Throttle
Executes the function **immediately** on the first call, then ignores subsequent calls until the delay period passes.

```javascript
function throttleLeading(func, delay) {
  let isThrottled = false;
  return function (...args) {
    if (!isThrottled) {
      func.apply(this, args); // Execute immediately
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false; // Reset after delay
      }, delay);
    }
  };
}
```

**Example:**
```javascript
const handleScroll = throttleLeading(() => {
  console.log("Scrolling");
}, 1000);

// User scrolls rapidly
handleScroll(); // Executes immediately
handleScroll(); // Ignored (within 1000ms)
handleScroll(); // Ignored
// After 1000ms, can execute again
handleScroll(); // Executes immediately
```

### Trailing Throttle
Executes the function **after** the delay period, ignoring the initial call.

```javascript
function throttleTrailing(func, delay) {
  let timeoutId;
  let lastArgs;
  return function (...args) {
    lastArgs = args;
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        func.apply(this, lastArgs); // Execute with last arguments
      }, delay);
    }
  };
}
```

**Example:**
```javascript
const handleResize = throttleTrailing(() => {
  console.log("Window resized");
}, 1000);

// User resizes window rapidly
handleResize(); // Timer starts, will execute after 1000ms
handleResize(); // Ignored (timer already running)
handleResize(); // Ignored
// After 1000ms, executes with last call's context
```

## Real-World Use Cases

### 1. Search Input (Debouncing)

```javascript
const searchInput = document.getElementById('search');

const debouncedSearch = debounceTrailing((query) => {
  // API call to search
  fetch(`/api/search?q=${query}`)
    .then(response => response.json())
    .then(results => {
      displayResults(results);
    });
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### 2. Window Resize (Throttling)

```javascript
const handleResize = throttleLeading(() => {
  // Recalculate layout
  updateLayout();
}, 250);

window.addEventListener('resize', handleResize);
```

### 3. Scroll Events (Throttling)

```javascript
const handleScroll = throttleTrailing(() => {
  // Update scroll position indicator
  updateScrollIndicator();
}, 100);

window.addEventListener('scroll', handleScroll);
```

### 4. Button Clicks (Debouncing)

```javascript
const submitButton = document.getElementById('submit');

const debouncedSubmit = debounceTrailing(() => {
  // Submit form
  submitForm();
}, 1000);

submitButton.addEventListener('click', debouncedSubmit);
```

## Complete Example

```javascript
// Debounce implementation
function debounceTrailing(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Throttle implementation
function throttleLeading(func, delay) {
  let isThrottled = false;
  return function (...args) {
    if (!isThrottled) {
      func.apply(this, args);
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}

// Usage
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

// Debounce example
const debouncedGreet = debounceTrailing(greet, 300);
debouncedGreet("Alice"); // Timer starts
debouncedGreet("Bob");   // Timer resets
debouncedGreet("Charlie"); // Timer resets
// After 300ms: "Hello, Charlie!" (only last call executes)

// Throttle example
const throttledGreet = throttleLeading(greet, 300);
throttledGreet("Alice");   // Executes immediately
throttledGreet("Bob");     // Ignored
throttledGreet("Charlie"); // Ignored
// After 300ms, can execute again
setTimeout(() => {
  throttledGreet("David"); // Executes immediately
}, 400);
```

## Best Practices

1. **Use debouncing** for:
   - Search input fields
   - Form submissions
   - API calls triggered by user input
   - Window resize (if you only care about final size)

2. **Use throttling** for:
   - Scroll events
   - Mouse move events
   - Window resize (if you need updates during resize)
   - Continuous user interactions

3. **Choose appropriate delays**:
   - Search: 300-500ms
   - Scroll/Resize: 100-250ms
   - Button clicks: 1000ms (prevent double-clicks)

4. **Consider context binding**:
   - Use `func.apply(this, args)` to preserve `this` context
   - Important when debouncing/throttling methods

## Key Takeaways

1. **Debouncing** delays execution until events stop firing
2. **Throttling** limits execution frequency to at most once per time period
3. **Trailing** executes after delay, **Leading** executes immediately
4. **Use debouncing** for search, form submissions, API calls
5. **Use throttling** for scroll, resize, continuous events
6. **Always preserve context** with `apply()` or arrow functions
7. **Choose appropriate delays** based on use case

