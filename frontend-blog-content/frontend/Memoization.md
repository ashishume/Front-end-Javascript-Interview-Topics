# Memoization in JavaScript

## Overview
Memoization is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again. It's a form of caching that trades memory for speed.

## Basic Concept

Memoization works by:
1. Checking if the result for given arguments already exists in cache
2. If it exists, return the cached result
3. If not, compute the result, store it in cache, and return it

## Simple Memoization Implementation

```javascript
// Function which renders for approx 60ms
function renderItems(x, y) {
  for (let i = 0; i < 99999999; i++) {}
  return x * y;
}

// Memoization function which caches the previous args data and returns it if already present
function memoiseRender(func, context) {
  const res = {};
  return function (...args) {
    const argsCache = JSON.stringify(args);

    if (!res[argsCache]) {
      res[argsCache] = func.call(context || this, ...args);
    }
    return res[argsCache];
  };
}

const callMethod = memoiseRender(renderItems);

console.time("First");
console.log(callMethod(2, 7)); // Computes and caches
console.timeEnd("First"); // time prints ~60ms

console.time("Second");
console.log(callMethod(2, 7)); // Returns cached result
console.timeEnd("Second"); // time prints ~0.04ms
```

## Generic Memoization Function

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function (...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

## Use Cases

### 1. Fibonacci Sequence

```javascript
// Without memoization - very slow for large numbers
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// With memoization - much faster
const memoizedFibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.log(memoizedFibonacci(40)); // Fast!
```

### 2. Expensive Calculations

```javascript
function expensiveCalculation(n) {
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += i;
  }
  return result;
}

const memoizedCalculation = memoize(expensiveCalculation);

// First call - computes
memoizedCalculation(100);

// Second call - returns cached result instantly
memoizedCalculation(100);
```

### 3. API Calls

```javascript
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

const memoizedFetch = memoize(fetchUserData);

// First call - makes API request
await memoizedFetch(123);

// Second call - returns cached data
await memoizedFetch(123);
```

## Advanced Memoization

### With Cache Size Limit (LRU Cache)

```javascript
function memoizeWithLimit(fn, maxSize = 100) {
  const cache = new Map();
  
  return function (...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      // Move to end (most recently used)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    const result = fn.apply(this, args);
    
    // Remove oldest if cache is full
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  };
}
```

### With Time-Based Expiration

```javascript
function memoizeWithTTL(fn, ttl = 60000) { // Default 1 minute
  const cache = new Map();
  
  return function (...args) {
    const key = JSON.stringify(args);
    const now = Date.now();
    
    if (cache.has(key)) {
      const { value, timestamp } = cache.get(key);
      if (now - timestamp < ttl) {
        return value;
      }
      cache.delete(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, { value: result, timestamp: now });
    return result;
  };
}
```

## React.useMemo Hook

React provides a built-in memoization hook:

```javascript
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    // Expensive calculation
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]); // Only recalculates when data changes
  
  return <div>{expensiveValue}</div>;
}
```

## When to Use Memoization

### Good Use Cases:
- Expensive computations
- Functions called frequently with same arguments
- Recursive functions (like Fibonacci)
- Pure functions (same input always produces same output)
- API calls with same parameters

### When NOT to Use:
- Functions with side effects
- Functions that need fresh data every time
- Simple, fast functions (overhead not worth it)
- Functions with many different arguments (cache becomes too large)

## Best Practices

1. **Use for Pure Functions**: Memoization works best with pure functions
2. **Consider Memory Usage**: Cache can grow large - implement size limits
3. **Handle Async Functions**: Use proper memoization for async operations
4. **Clear Cache When Needed**: Provide a way to clear cache if data changes
5. **Use Appropriate Keys**: Ensure cache keys uniquely identify function arguments
6. **Test Performance**: Measure before and after to ensure improvement

## Limitations

1. **Memory Overhead**: Cached results consume memory
2. **Cache Key Complexity**: Complex objects as arguments can be problematic
3. **Not for Side Effects**: Only works for pure functions
4. **Cache Invalidation**: Need strategy to clear stale cache

## Example: Complete Memoization Utility

```javascript
class Memoizer {
  constructor(options = {}) {
    this.cache = new Map();
    this.maxSize = options.maxSize || Infinity;
    this.ttl = options.ttl || Infinity;
  }
  
  memoize(fn) {
    return (...args) => {
      const key = JSON.stringify(args);
      const now = Date.now();
      
      if (this.cache.has(key)) {
        const { value, timestamp } = this.cache.get(key);
        if (now - timestamp < this.ttl) {
          return value;
        }
        this.cache.delete(key);
      }
      
      const result = fn.apply(this, args);
      
      if (this.cache.size >= this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      
      this.cache.set(key, { value: result, timestamp: now });
      return result;
    };
  }
  
  clear() {
    this.cache.clear();
  }
  
  size() {
    return this.cache.size;
  }
}
```
