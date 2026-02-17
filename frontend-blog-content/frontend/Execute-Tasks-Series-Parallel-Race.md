# Execute N Tasks in Series, Parallel, and Race in JavaScript

## Overview
When working with asynchronous tasks in JavaScript, you often need to execute them in different patterns: sequentially (series), concurrently (parallel), or as a race (first to complete). Each pattern serves different use cases and has different performance characteristics.

## Execute Tasks in Series

Series execution means tasks run one after another, waiting for each to complete before starting the next.

### Using Async/Await
```javascript
async function executeTasksInSeries(tasks) {
  const results = [];
  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }
  return results;
}
```

### Using Reduce
```javascript
function executeTasksInSeries(tasks) {
  return tasks.reduce((prevPromise, task) => {
    return prevPromise.then((results) => {
      return task().then((result) => {
        results.push(result);
        return results;
      });
    });
  }, Promise.resolve([]));
}
```

### API Calls in Series
```javascript
async function makeSequentialAPICalls(tasks) {
  try {
    await tasks.reduce(async (previousPromise, apiCall) => {
      await previousPromise;
      const result = await apiCall();
      console.log("API call result:", result);
    }, Promise.resolve());
    console.log("All API calls completed successfully");
  } catch (error) {
    console.error("Error making API calls:", error);
  }
}

makeSequentialAPICalls([task1, task2, task3]);
```

## Execute Tasks in Parallel

Parallel execution means all tasks start simultaneously and complete independently.

### Using Promise.all()
```javascript
async function executeTasksInParallel(tasks) {
  const results = await Promise.all(tasks.map((task) => task()));
  return results;
}

// Usage
executeTasksInParallel([task1, task2, task3]).then((results) => {
  console.log(results); // Output: ['Result 1', 'Result 2', 'Result 3']
});
```

### With Error Handling
```javascript
async function executeTasksInParallelSafe(tasks) {
  try {
    const results = await Promise.all(tasks.map((task) => task()));
    return { success: true, results };
  } catch (error) {
    return { success: false, error };
  }
}
```

## Execute Tasks in Race

Race execution means all tasks start simultaneously, but only the first to complete is returned.

### Using Promise.race()
```javascript
async function executeTasksInRace(tasks) {
  const result = await Promise.race(tasks.map((task) => task()));
  return result;
}

// Usage
executeTasksInRace([task1, task2, task3]).then((result) => {
  console.log(result); // Output: 'Result 1' (or whichever task finishes first)
});
```

## Sample Task Functions

```javascript
function task1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Result 1");
    }, 1000); // 1 second delay
  });
}

function task2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Result 2");
    }, 500); // 0.5 second delay
  });
}

function task3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Result 3");
    }, 1500); // 1.5 second delay
  });
}
```

## Advanced Patterns

### Series with Error Recovery
```javascript
async function executeTasksInSeriesWithRecovery(tasks) {
  const results = [];
  const errors = [];
  
  for (const task of tasks) {
    try {
      const result = await task();
      results.push(result);
    } catch (error) {
      errors.push(error);
      // Continue with next task
    }
  }
  
  return { results, errors };
}
```

### Parallel with Limit (Batched)
```javascript
async function executeTasksInBatches(tasks, batchSize) {
  const results = [];
  
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(task => task()));
    results.push(...batchResults);
  }
  
  return results;
}
```

### Race with Timeout
```javascript
async function executeTasksInRaceWithTimeout(tasks, timeout) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });
  
  return Promise.race([
    Promise.race(tasks.map(task => task())),
    timeoutPromise
  ]);
}
```

### Parallel with Progress Tracking
```javascript
async function executeTasksInParallelWithProgress(tasks, onProgress) {
  let completed = 0;
  const total = tasks.length;
  
  const results = await Promise.all(
    tasks.map(async (task, index) => {
      const result = await task();
      completed++;
      if (onProgress) {
        onProgress(completed, total, index);
      }
      return result;
    })
  );
  
  return results;
}
```

## Use Cases

### Series - When to Use
- Tasks depend on previous results
- Need to avoid overwhelming a resource
- Sequential processing required
- Order matters

```javascript
// Example: User registration flow
const registrationFlow = [
  validateEmail,
  checkEmailExists,
  createUser,
  sendWelcomeEmail
];
await executeTasksInSeries(registrationFlow);
```

### Parallel - When to Use
- Tasks are independent
- Need maximum performance
- All results are needed
- No resource constraints

```javascript
// Example: Fetching multiple API endpoints
const apiCalls = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
];
const [users, posts, comments] = await executeTasksInParallel(apiCalls);
```

### Race - When to Use
- Need fastest result
- Multiple fallback options
- Timeout scenarios
- First successful result

```javascript
// Example: Multiple CDN sources
const cdnSources = [
  fetch('https://cdn1.example.com/data'),
  fetch('https://cdn2.example.com/data'),
  fetch('https://cdn3.example.com/data')
];
const data = await executeTasksInRace(cdnSources);
```

## Performance Comparison

```javascript
// Series: Total time = sum of all task times
// If tasks take [1s, 2s, 3s], total = 6s

// Parallel: Total time = longest task time
// If tasks take [1s, 2s, 3s], total = 3s

// Race: Total time = shortest task time
// If tasks take [1s, 2s, 3s], total = 1s
```

## Best Practices

1. **Use Series**: When order matters or tasks depend on each other
2. **Use Parallel**: When tasks are independent and you need all results
3. **Use Race**: When you only need the fastest result
4. **Handle Errors**: Always include error handling for production code
5. **Consider Timeouts**: Add timeouts to prevent hanging operations
6. **Monitor Performance**: Track execution times for optimization

## Real-World Example

```javascript
class TaskExecutor {
  static async series(tasks) {
    const results = [];
    for (const task of tasks) {
      results.push(await task());
    }
    return results;
  }
  
  static async parallel(tasks) {
    return Promise.all(tasks.map(task => task()));
  }
  
  static async race(tasks) {
    return Promise.race(tasks.map(task => task()));
  }
  
  static async allSettled(tasks) {
    return Promise.allSettled(tasks.map(task => task()));
  }
}

// Usage
const tasks = [task1, task2, task3];
const seriesResults = await TaskExecutor.series(tasks);
const parallelResults = await TaskExecutor.parallel(tasks);
const raceResult = await TaskExecutor.race(tasks);
```
