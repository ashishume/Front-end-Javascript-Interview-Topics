# Map Async with Limit in JavaScript

## Overview
Map Async with Limit is a technique to process an array of items asynchronously while limiting the number of concurrent operations. This is crucial for preventing overwhelming APIs, managing resource usage, and controlling the rate of asynchronous operations.

## Basic Implementation

```javascript
async function mapAsyncLimit(iterable, callbackFn, limit) {
  const results = [];
  const executing = new Set();

  for (const item of iterable) {
    const promise = Promise.resolve().then(() => callbackFn(item));
    results.push(promise);

    if (limit <= iterable.length) {
      const execution = promise.finally(() => executing.delete(execution));
      executing.add(execution);

      if (executing.size >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}
```

## Example Usage

```javascript
async function fetchUpperCase(word) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts");
    return new Promise((resolve) => {
      setTimeout(() => resolve(word.toUpperCase()), 500);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Only a maximum of 2 pending requests at any one time
(async () => {
  try {
    const results = await mapAsyncLimit(
      ["foo", "bar", "qux", "quz"],
      fetchUpperCase,
      2
    );
    console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ']
  } catch (error) {
    console.error("Error in main execution:", error);
  }
})();
```

## Alternative Implementation

```javascript
async function mapAsyncLimit(iterable, callbackFn, limit) {
  const results = [];
  const executing = [];
  
  for (const item of iterable) {
    const promise = Promise.resolve(callbackFn(item))
      .then(result => {
        executing.splice(executing.indexOf(promise), 1);
        return result;
      });
    
    results.push(promise);
    executing.push(promise);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}
```

## Use Cases

### 1. API Rate Limiting
```javascript
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Limit to 3 concurrent requests
const users = await mapAsyncLimit(userIds, fetchUserData, 3);
```

### 2. Image Processing
```javascript
async function processImage(imageUrl) {
  // Expensive image processing
  return processedImage;
}

const imageUrls = [/* array of URLs */];
const processed = await mapAsyncLimit(imageUrls, processImage, 5);
```

### 3. Database Queries
```javascript
async function fetchUserPosts(userId) {
  return db.query('SELECT * FROM posts WHERE userId = ?', [userId]);
}

const userIds = [1, 2, 3, /* ... */];
const allPosts = await mapAsyncLimit(userIds, fetchUserPosts, 10);
```

## Advanced: With Error Handling

```javascript
async function mapAsyncLimit(iterable, callbackFn, limit, options = {}) {
  const { 
    onError = (error, item) => console.error('Error processing item:', item, error),
    stopOnError = false 
  } = options;
  
  const results = [];
  const executing = new Set();
  const errors = [];

  for (const item of iterable) {
    const promise = Promise.resolve()
      .then(() => callbackFn(item))
      .catch(error => {
        onError(error, item);
        if (stopOnError) {
          throw error;
        }
        return { error, item };
      })
      .finally(() => executing.delete(promise));
    
    results.push(promise);
    executing.add(promise);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}
```

## Advanced: With Progress Tracking

```javascript
async function mapAsyncLimit(iterable, callbackFn, limit, onProgress) {
  const results = [];
  const executing = new Set();
  let completed = 0;
  const total = iterable.length;

  for (const item of iterable) {
    const promise = Promise.resolve()
      .then(() => callbackFn(item))
      .then(result => {
        completed++;
        if (onProgress) {
          onProgress(completed, total);
        }
        return result;
      })
      .finally(() => executing.delete(promise));
    
    results.push(promise);
    executing.add(promise);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}

// Usage with progress
await mapAsyncLimit(
  items,
  processItem,
  5,
  (completed, total) => {
    console.log(`Progress: ${completed}/${total} (${(completed/total*100).toFixed(1)}%)`);
  }
);
```

## Comparison: Sequential vs Parallel vs Limited

```javascript
// Sequential - slow but safe
async function mapSequential(iterable, callbackFn) {
  const results = [];
  for (const item of iterable) {
    results.push(await callbackFn(item));
  }
  return results;
}

// Parallel - fast but can overwhelm
async function mapParallel(iterable, callbackFn) {
  return Promise.all(iterable.map(callbackFn));
}

// Limited - balanced approach
async function mapAsyncLimit(iterable, callbackFn, limit) {
  // Implementation above
}
```

## Performance Considerations

1. **Limit Size**: Too small = slow, too large = resource exhaustion
2. **Memory Usage**: Each executing promise uses memory
3. **Error Handling**: Failed promises shouldn't block others
4. **Progress Tracking**: Useful for long-running operations

## Best Practices

1. **Choose Appropriate Limit**: Based on API rate limits and resources
2. **Handle Errors Gracefully**: Don't let one failure stop all operations
3. **Monitor Performance**: Track execution time and success rates
4. **Use for I/O Operations**: Best for network/database calls, not CPU-intensive tasks
5. **Consider Retry Logic**: Combine with retry for transient failures

## Real-World Example: Batch Processing

```javascript
class BatchProcessor {
  constructor(limit = 5) {
    this.limit = limit;
  }
  
  async process(items, processor, onProgress) {
    return mapAsyncLimit(
      items,
      processor,
      this.limit,
      onProgress
    );
  }
}

const processor = new BatchProcessor(3);

const results = await processor.process(
  userEmails,
  async (email) => {
    return sendEmail(email);
  },
  (completed, total) => {
    updateProgressBar(completed / total);
  }
);
```
