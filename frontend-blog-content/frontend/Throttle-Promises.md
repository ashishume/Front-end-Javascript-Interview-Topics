# Throttle Promises in JavaScript

## Overview
Throttling promises is a technique to limit the number of concurrent promise executions. This is essential for managing API rate limits, preventing resource exhaustion, and controlling the flow of asynchronous operations.

## Basic Implementation

```javascript
function throttlePromises(promises, maxRequests) {
  const results = [];
  let running = 0;
  let index = 0;

  return new Promise((resolve, reject) => {
    function runNext() {
      // Check if all promises have been processed
      if (index >= promises.length) {
        // Resolve the promise with the final results once all promises are processed
        if (running === 0) {
          resolve(results);
        }
        return;
      }

      // Get the next promise from the array
      const promise = promises[index];
      index++;

      // Increment the running count to track the number of currently running promises
      running++;

      // Execute the promise
      promise()
        .then((result) => {
          // Push the result of the promise to the results array
          results.push(result);
        })
        .catch((error) => {
          // Handle errors if needed
          reject(error);
        })
        .finally(() => {
          // Decrement the running count when the promise is settled
          running--;
          // Run the next promise
          runNext();
        });

      // If there are available slots for execution, immediately run the next promise
      if (running < maxRequests) {
        runNext();
      }
    }

    // Start processing promises
    runNext();
  });
}
```

## Example Usage

```javascript
// Define some promise-generating functions (simulating API requests)
function simulateAPIRequest(id) {
  return () =>
    new Promise((resolve) => {
      console.log(`Sending request for ID: ${id}`);
      setTimeout(() => {
        console.log(`Received response for ID: ${id}`);
        resolve(`Response for ID: ${id}`);
      }, 1000); // Simulate API delay
    });
}

// Create an array of promise-generating functions
const promises = [
  simulateAPIRequest(1),
  simulateAPIRequest(2),
  simulateAPIRequest(3),
  simulateAPIRequest(4),
  simulateAPIRequest(5),
  simulateAPIRequest(6),
  simulateAPIRequest(7),
  simulateAPIRequest(8),
  simulateAPIRequest(9),
  simulateAPIRequest(10),
];

// Throttle the promises to limit to 3 requests at a time
throttlePromises(promises, 3)
  .then((results) => {
    console.log("All requests completed:", results);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## Advanced Implementation with Error Handling

```javascript
function throttlePromises(promises, maxRequests, options = {}) {
  const {
    onProgress = null,
    stopOnError = false,
    retryOnError = false,
    maxRetries = 0
  } = options;

  const results = [];
  const errors = [];
  let running = 0;
  let index = 0;
  let completed = 0;

  return new Promise((resolve, reject) => {
    function runNext() {
      if (index >= promises.length) {
        if (running === 0) {
          if (stopOnError && errors.length > 0) {
            reject(errors[0]);
          } else {
            resolve({ results, errors });
          }
        }
        return;
      }

      const promiseFn = promises[index];
      index++;
      running++;

      function executePromise(retryCount = 0) {
        promiseFn()
          .then((result) => {
            results.push({ index: completed, result });
            completed++;
            if (onProgress) {
              onProgress(completed, promises.length);
            }
          })
          .catch((error) => {
            if (retryOnError && retryCount < maxRetries) {
              // Retry the promise
              executePromise(retryCount + 1);
              return;
            }
            errors.push({ index: completed, error });
            completed++;
            if (stopOnError) {
              reject(error);
              return;
            }
            if (onProgress) {
              onProgress(completed, promises.length);
            }
          })
          .finally(() => {
            running--;
            runNext();
          });
      }

      executePromise();

      if (running < maxRequests) {
        runNext();
      }
    }

    runNext();
  });
}
```

## Use Cases

### 1. API Rate Limiting
```javascript
function createAPIRequest(endpoint) {
  return () => fetch(endpoint).then(res => res.json());
}

const endpoints = [
  '/api/users/1',
  '/api/users/2',
  // ... 100 more endpoints
].map(createAPIRequest);

// Limit to 5 concurrent requests
throttlePromises(endpoints, 5)
  .then(({ results }) => {
    console.log('All users fetched:', results);
  });
```

### 2. Image Processing
```javascript
function processImage(imageUrl) {
  return () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(processImageData(img));
      img.src = imageUrl;
    });
  };
}

const imageUrls = [/* array of URLs */];
const processors = imageUrls.map(processImage);

throttlePromises(processors, 3)
  .then(({ results }) => {
    displayProcessedImages(results);
  });
```

### 3. Database Batch Operations
```javascript
function updateUser(userId, data) {
  return () => db.update('users', userId, data);
}

const updates = users.map(user => 
  updateUser(user.id, user.updatedData)
);

throttlePromises(updates, 10)
  .then(({ results, errors }) => {
    console.log(`Updated ${results.length} users`);
    if (errors.length > 0) {
      console.error(`${errors.length} updates failed`);
    }
  });
```

## With Progress Tracking

```javascript
throttlePromises(promises, 3, {
  onProgress: (completed, total) => {
    const percentage = (completed / total * 100).toFixed(1);
    updateProgressBar(percentage);
    console.log(`Progress: ${completed}/${total} (${percentage}%)`);
  }
})
  .then(({ results }) => {
    console.log('All done!', results);
  });
```

## Comparison with Other Approaches

### Sequential Execution
```javascript
// Slow - one at a time
async function sequential(promises) {
  const results = [];
  for (const promiseFn of promises) {
    results.push(await promiseFn());
  }
  return results;
}
```

### Parallel Execution
```javascript
// Fast but can overwhelm
async function parallel(promises) {
  return Promise.all(promises.map(fn => fn()));
}
```

### Throttled Execution
```javascript
// Balanced - controlled concurrency
throttlePromises(promises, 5);
```

## Advanced: With Priority Queue

```javascript
class PriorityThrottle {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }

  add(promiseFn, priority = 0) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promiseFn, priority, resolve, reject });
      this.queue.sort((a, b) => b.priority - a.priority);
      this.process();
    });
  }

  async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    const { promiseFn, resolve, reject } = this.queue.shift();
    this.running++;

    try {
      const result = await promiseFn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
}
```

## Best Practices

1. **Choose Appropriate Limit**: Based on API rate limits and server capacity
2. **Handle Errors**: Don't let one failure stop all operations
3. **Track Progress**: Provide feedback for long-running operations
4. **Monitor Performance**: Track execution times and success rates
5. **Use for I/O Operations**: Best for network/database calls
6. **Consider Retry Logic**: Retry failed operations when appropriate
7. **Clean Up Resources**: Ensure proper cleanup of resources

## Real-World Example: Batch Upload

```javascript
async function batchUpload(files, maxConcurrent = 3) {
  const uploadPromises = files.map(file => 
    () => uploadFile(file)
  );

  const { results, errors } = await throttlePromises(
    uploadPromises,
    maxConcurrent,
    {
      onProgress: (completed, total) => {
        updateUploadProgress(completed, total);
      },
      stopOnError: false
    }
  );

  return {
    successful: results.length,
    failed: errors.length,
    results,
    errors
  };
}
```
