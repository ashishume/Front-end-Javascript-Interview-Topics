# Function Call Only Twice in JavaScript

## Overview
The "function call only twice" pattern stores two instances of function invocation results and alternates between returning the first result on odd calls and the second result on even calls. This is useful for caching pairs of results, implementing toggle behavior, or creating stateful functions that remember their last two invocations.

## Basic Implementation

```javascript
/**
 * Implement a function onlyTwice which stores two instances of a function invocation
 * and returns first on odd calls and second on even calls in js
 */
const onlyTwice = (fn) => {
  let isOdd = true;
  let first = null;
  let second = null;

  return function (...args) {
    if (isOdd) {
      if (!first) {
        first = fn(...args);
      }

      isOdd = false;
      return first;
    } else {
      if (!second) {
        second = fn(...args);
      }

      isOdd = true;
      return second;
    }
  };
};

// Usage
const addTwoNumbers = (a, b) => a + b;
const myFancyAdd = onlyTwice(addTwoNumbers);

console.log(myFancyAdd(2, 3)); // 5 (first call, stored in 'first')
console.log(myFancyAdd(1, 2)); // 3 (second call, stored in 'second')
console.log(myFancyAdd(3, 4)); // 5 (third call, returns 'first')
console.log(myFancyAdd(3, 7)); // 3 (fourth call, returns 'second')
```

## How It Works

1. **First Call (Odd)**: Executes the function, stores result in `first`, returns it
2. **Second Call (Even)**: Executes the function, stores result in `second`, returns it
3. **Third Call (Odd)**: Returns cached `first` without executing
4. **Fourth Call (Even)**: Returns cached `second` without executing
5. **Pattern Repeats**: Alternates between returning `first` and `second`

## Advanced Implementation with Reset

```javascript
function onlyTwiceWithReset(fn) {
  let isOdd = true;
  let first = null;
  let second = null;
  let callCount = 0;

  const wrapped = function (...args) {
    callCount++;
    
    if (isOdd) {
      if (!first) {
        first = fn(...args);
      }
      isOdd = false;
      return first;
    } else {
      if (!second) {
        second = fn(...args);
      }
      isOdd = true;
      return second;
    }
  };

  wrapped.reset = function () {
    first = null;
    second = null;
    isOdd = true;
    callCount = 0;
  };

  wrapped.getCallCount = function () {
    return callCount;
  };

  wrapped.getCached = function () {
    return { first, second };
  };

  return wrapped;
}
```

## Implementation with Arguments Tracking

```javascript
function onlyTwiceWithArgs(fn) {
  let isOdd = true;
  let first = { result: null, args: null };
  let second = { result: null, args: null };

  return function (...args) {
    if (isOdd) {
      if (!first.result) {
        first.result = fn(...args);
        first.args = args;
      }
      isOdd = false;
      return first.result;
    } else {
      if (!second.result) {
        second.result = fn(...args);
        second.args = args;
      }
      isOdd = true;
      return second.result;
    }
  };
}
```

## Use Cases

### 1. Toggle Behavior
```javascript
const toggle = onlyTwice((value) => !value);

console.log(toggle(true));  // false (first call)
console.log(toggle(false)); // true (second call)
console.log(toggle(true));  // false (returns first cached)
console.log(toggle(false)); // true (returns second cached)
```

### 2. API Response Caching
```javascript
const cachedFetch = onlyTwice(async (url) => {
  const response = await fetch(url);
  return response.json();
});

// First two calls make actual requests
const data1 = await cachedFetch('/api/data');
const data2 = await cachedFetch('/api/data');

// Subsequent calls return cached results
const data3 = await cachedFetch('/api/data'); // Returns first cached
const data4 = await cachedFetch('/api/data'); // Returns second cached
```

### 3. Expensive Computation Caching
```javascript
const expensiveComputation = (n) => {
  console.log('Computing...', n);
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += i;
  }
  return result;
};

const cachedCompute = onlyTwice(expensiveComputation);

console.log(cachedCompute(10)); // Computes and caches
console.log(cachedCompute(20)); // Computes and caches
console.log(cachedCompute(30)); // Returns first cached (fast!)
console.log(cachedCompute(40)); // Returns second cached (fast!)
```

### 4. State Machine
```javascript
const stateMachine = onlyTwice((state) => {
  return state === 'idle' ? 'active' : 'idle';
});

console.log(stateMachine('idle'));   // 'active' (first)
console.log(stateMachine('active')); // 'idle' (second)
console.log(stateMachine('idle'));   // 'active' (returns first)
console.log(stateMachine('active')); // 'idle' (returns second)
```

## Advanced: With Custom Selector

```javascript
function onlyTwiceWithSelector(fn, selector = (a, b) => a) {
  let isOdd = true;
  let first = null;
  let second = null;

  return function (...args) {
    if (isOdd) {
      if (!first) {
        first = fn(...args);
      }
      isOdd = false;
      return first;
    } else {
      if (!second) {
        second = fn(...args);
      }
      isOdd = true;
      return selector(first, second);
    }
  };
}

// Usage: Always return the maximum
const maxCache = onlyTwiceWithSelector(
  (n) => n * 2,
  (a, b) => Math.max(a, b)
);
```

## Advanced: With Time-Based Expiration

```javascript
function onlyTwiceWithExpiry(fn, ttl = 60000) {
  let isOdd = true;
  let first = { result: null, timestamp: null };
  let second = { result: null, timestamp: null };

  return function (...args) {
    const now = Date.now();

    if (isOdd) {
      if (!first.result || now - first.timestamp > ttl) {
        first.result = fn(...args);
        first.timestamp = now;
      }
      isOdd = false;
      return first.result;
    } else {
      if (!second.result || now - second.timestamp > ttl) {
        second.result = fn(...args);
        second.timestamp = now;
      }
      isOdd = true;
      return second.result;
    }
  };
}
```

## Real-World Example: Theme Toggler

```javascript
const themeToggler = onlyTwice((currentTheme) => {
  return currentTheme === 'light' ? 'dark' : 'light';
});

function toggleTheme() {
  const currentTheme = document.body.classList.contains('dark') 
    ? 'dark' 
    : 'light';
  const newTheme = themeToggler(currentTheme);
  
  document.body.classList.toggle('dark', newTheme === 'dark');
  localStorage.setItem('theme', newTheme);
}

// Usage
toggleTheme(); // Switches to dark
toggleTheme(); // Switches to light
toggleTheme(); // Returns cached dark (no actual toggle)
toggleTheme(); // Returns cached light (no actual toggle)
```

## Comparison with Other Patterns

### vs Memoization
- **Memoization**: Caches all unique inputs
- **Only Twice**: Caches only last two results, alternates

### vs Once
- **Once**: Executes function only once, always returns same result
- **Only Twice**: Executes twice, alternates between two results

### vs Debounce/Throttle
- **Debounce/Throttle**: Controls execution frequency
- **Only Twice**: Controls result caching pattern

## Best Practices

1. **Understand Use Case**: Only use when you need exactly two cached results
2. **Consider Arguments**: Be aware that arguments are ignored after first two calls
3. **Memory Management**: Results are cached indefinitely unless reset
4. **Thread Safety**: Not thread-safe if used in concurrent environments
5. **Testing**: Test with various call patterns to ensure correct behavior

## Limitations

1. **Fixed Cache Size**: Only stores two results
2. **Argument Ignoring**: Arguments after first two calls are ignored
3. **No Invalidation**: Cached results don't expire automatically
4. **Alternating Pattern**: Always alternates, can't choose which to return

## Alternative: Flexible Cache Size

```javascript
function cacheLastN(fn, n = 2) {
  const cache = [];
  let index = 0;

  return function (...args) {
    if (cache.length < n) {
      const result = fn(...args);
      cache.push(result);
      return result;
    }

    const result = cache[index % n];
    index++;
    return result;
  };
}

// Usage: Cache last 3 results
const cached = cacheLastN((n) => n * 2, 3);
console.log(cached(1)); // 2 (computed)
console.log(cached(2)); // 4 (computed)
console.log(cached(3)); // 6 (computed)
console.log(cached(4)); // 2 (returns first cached)
console.log(cached(5)); // 4 (returns second cached)
```
