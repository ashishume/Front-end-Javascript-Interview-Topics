# Map Async in JavaScript

## Overview
Map Async is a technique to apply an asynchronous function to each element in an array and collect the results. Unlike regular `map()`, it handles promises and can execute operations in sequence or parallel, making it essential for processing arrays of async operations.

## Basic Implementation

```javascript
/** Create map async */

// 1st way - Sequential execution
async function mapAsync1(iterable, callbackFn) {
  const results = [];
  for (let item of iterable) {
    const result = await callbackFn(item);
    results.push(result);
  }
  return results;
}

// 2nd way - Parallel execution
async function mapAsync2(iterable, callbackFn) {
  return Promise.all(iterable.map(callbackFn));
}

const asyncDouble = (x) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 10);
  });

(async () => {
  const doubled = await mapAsync1([1, 2], asyncDouble);
  console.log(doubled); // [2, 4]
})();

(async () => {
  const doubled = await mapAsync2([3, 4], asyncDouble);
  console.log(doubled); // [6, 8]
})();
```

## Sequential vs Parallel

### Sequential (One at a Time)
```javascript
async function mapAsyncSequential(array, asyncFn) {
  const results = [];
  for (const item of array) {
    const result = await asyncFn(item);
    results.push(result);
  }
  return results;
}

// Total time = sum of all operations
```

### Parallel (All at Once)
```javascript
async function mapAsyncParallel(array, asyncFn) {
  return Promise.all(array.map(asyncFn));
}

// Total time = longest operation
```

## Enhanced Implementation

```javascript
async function mapAsync(iterable, callbackFn, options = {}) {
  const { 
    concurrency = Infinity,
    sequential = false 
  } = options;
  
  if (sequential || concurrency === 1) {
    // Sequential execution
    const results = [];
    for (const item of iterable) {
      results.push(await callbackFn(item));
    }
    return results;
  }
  
  if (concurrency === Infinity) {
    // Parallel execution
    return Promise.all(Array.from(iterable).map(callbackFn));
  }
  
  // Limited concurrency
  return mapAsyncWithLimit(iterable, callbackFn, concurrency);
}
```

## Use Cases

### 1. API Calls
```javascript
const userIds = [1, 2, 3, 4, 5];
const users = await mapAsync(userIds, async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
});
```

### 2. Image Processing
```javascript
const imageUrls = ["url1", "url2", "url3"];
const processed = await mapAsync(imageUrls, async (url) => {
  const img = await loadImage(url);
  return processImage(img);
});
```

### 3. Database Queries
```javascript
const queries = ["SELECT * FROM users", "SELECT * FROM posts"];
const results = await mapAsync(queries, async (query) => {
  return db.query(query);
});
```

## Best Practices

1. **Choose Execution Mode**: Sequential vs Parallel based on needs
2. **Handle Errors**: Use try-catch or Promise.allSettled
3. **Limit Concurrency**: Prevent overwhelming resources
4. **Consider Order**: Sequential preserves order, parallel may not
5. **Memory Management**: Be aware of memory for large arrays
