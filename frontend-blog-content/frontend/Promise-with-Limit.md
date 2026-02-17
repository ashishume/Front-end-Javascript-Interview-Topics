# Promise with Time Limit in JavaScript

## Overview
Promise with Time Limit is a technique to add timeout functionality to promises, ensuring they complete within a specified duration. If a promise takes longer than the time limit, it will be rejected with a timeout error.

## Basic Implementation

```javascript
/**
 * Creates a function that wraps another function with a time limit
 * @param {Function} fn - The function to wrap
 * @param {number} t - Time limit in milliseconds
 * @return {Function} - Wrapped function that enforces time limit
 */
var timeLimit = function (fn, t) {
  return async function (...args) {
    const promise = fn(...args);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);
    });

    return Promise.race([promise, timeoutPromise]);
  };
};
```

## Example Usage

```javascript
// Example 1: Async function with timeout
const limited = timeLimit((t) => new Promise((res) => setTimeout(res, t)), 100);
limited(150).catch(console.log); // "Time Limit Exceeded" at t=100ms

// Example 2: Synchronous function
const func = function (t) {
  console.log(t);
};
const limited2 = timeLimit(func, 200);
limited2(150); // 150 (synchronous functions complete immediately)
```

## Advanced Implementation

```javascript
function timeLimit(fn, timeout, errorMessage = 'Time Limit Exceeded') {
  return async function (...args) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(errorMessage));
      }, timeout);
    });

    const executionPromise = Promise.resolve(fn(...args));

    return Promise.race([executionPromise, timeoutPromise]);
  };
}
```

## Use Cases

### 1. API Calls with Timeout
```javascript
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

const fetchWithTimeout = timeLimit(fetchUserData, 5000, 'API request timeout');

try {
  const user = await fetchWithTimeout(123);
  console.log(user);
} catch (error) {
  if (error.message === 'API request timeout') {
    console.error('Request took too long');
    // Show fallback UI
  } else {
    console.error('Other error:', error);
  }
}
```

### 2. Database Queries
```javascript
async function queryDatabase(query) {
  return db.query(query);
}

const queryWithTimeout = timeLimit(queryDatabase, 3000);

try {
  const results = await queryWithTimeout('SELECT * FROM users');
} catch (error) {
  console.error('Query timeout or error:', error);
}
```

### 3. Image Loading
```javascript
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

const loadImageWithTimeout = timeLimit(loadImage, 5000, 'Image load timeout');

try {
  const img = await loadImageWithTimeout('https://example.com/image.jpg');
  document.body.appendChild(img);
} catch (error) {
  console.error('Failed to load image:', error);
  // Show placeholder image
}
```

## Class-Based Implementation

```javascript
class TimeLimitedPromise {
  constructor(promise, timeout, errorMessage = 'Time Limit Exceeded') {
    this.promise = promise;
    this.timeout = timeout;
    this.errorMessage = errorMessage;
    this.timeoutId = null;
  }

  async execute() {
    const timeoutPromise = new Promise((_, reject) => {
      this.timeoutId = setTimeout(() => {
        reject(new Error(this.errorMessage));
      }, this.timeout);
    });

    try {
      const result = await Promise.race([this.promise, timeoutPromise]);
      clearTimeout(this.timeoutId);
      return result;
    } catch (error) {
      clearTimeout(this.timeoutId);
      throw error;
    }
  }

  cancel() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

// Usage
const promise = fetch('/api/data');
const limited = new TimeLimitedPromise(promise, 5000);
try {
  const data = await limited.execute();
} catch (error) {
  console.error(error);
}
```

## With AbortController

```javascript
function timeLimitWithAbort(fn, timeout) {
  return async function (...args) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const result = await fn(...args, { signal: controller.signal });
      clearTimeout(timeoutId);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Time Limit Exceeded');
      }
      throw error;
    }
  };
}
```

## Retry with Time Limit

```javascript
async function retryWithTimeLimit(fn, timeout, maxRetries = 3) {
  const limitedFn = timeLimit(fn, timeout);
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await limitedFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (error.message === 'Time Limit Exceeded') {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      } else {
        throw error; // Don't retry on other errors
      }
    }
  }
}
```

## Batch Operations with Time Limit

```javascript
async function batchWithTimeLimit(items, processor, itemTimeout, batchTimeout) {
  const results = [];
  const startTime = Date.now();
  
  for (const item of items) {
    if (Date.now() - startTime > batchTimeout) {
      throw new Error('Batch timeout exceeded');
    }
    
    const limitedProcessor = timeLimit(processor, itemTimeout);
    try {
      const result = await limitedProcessor(item);
      results.push({ success: true, result });
    } catch (error) {
      results.push({ success: false, error: error.message });
    }
  }
  
  return results;
}
```

## Error Handling Best Practices

```javascript
async function safeTimeLimit(fn, timeout, fallback = null) {
  try {
    const limitedFn = timeLimit(fn, timeout);
    return await limitedFn();
  } catch (error) {
    if (error.message === 'Time Limit Exceeded') {
      console.warn('Operation timed out, using fallback');
      return fallback !== null ? fallback : null;
    }
    throw error;
  }
}

// Usage
const data = await safeTimeLimit(
  fetchData,
  5000,
  { default: 'data' } // Fallback value
);
```

## Monitoring and Logging

```javascript
function timeLimitWithMetrics(fn, timeout, metrics = {}) {
  return async function (...args) {
    const startTime = Date.now();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        metrics.timeouts = (metrics.timeouts || 0) + 1;
        reject(new Error('Time Limit Exceeded'));
      }, timeout);
    });

    try {
      const result = await Promise.race([fn(...args), timeoutPromise]);
      const duration = Date.now() - startTime;
      metrics.successes = (metrics.successes || 0) + 1;
      metrics.avgDuration = ((metrics.avgDuration || 0) + duration) / metrics.successes;
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      metrics.failures = (metrics.failures || 0) + 1;
      throw error;
    }
  };
}
```

## Best Practices

1. **Set Reasonable Timeouts**: Balance between too short (false failures) and too long (poor UX)
2. **Handle Timeout Errors**: Distinguish timeout errors from other errors
3. **Provide Fallbacks**: Show alternative content when timeouts occur
4. **Log Timeouts**: Track timeout occurrences for monitoring
5. **Clean Up Timers**: Always clear timeouts to prevent memory leaks
6. **Consider Retry Logic**: Retry transient failures with exponential backoff
7. **Use for I/O Operations**: Best for network/database calls, not CPU-bound tasks

## Common Patterns

### Pattern 1: Fetch with Timeout
```javascript
const fetchWithTimeout = timeLimit(fetch, 5000);
const response = await fetchWithTimeout('/api/data');
```

### Pattern 2: Promise Chain with Timeout
```javascript
const processWithTimeout = timeLimit(
  async (data) => {
    const step1 = await processStep1(data);
    const step2 = await processStep2(step1);
    return processStep3(step2);
  },
  10000
);
```

### Pattern 3: Multiple Timeouts
```javascript
const quickOperation = timeLimit(operation, 1000);
const slowOperation = timeLimit(operation, 10000);

try {
  return await quickOperation();
} catch {
  return await slowOperation(); // Fallback to longer timeout
}
```
