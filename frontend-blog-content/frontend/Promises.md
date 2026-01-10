# Promises in JavaScript

## Overview
A Promise in JavaScript represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises have three states: **pending**, **fulfilled**, or **rejected**.

## Promise States
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

## Basic Promise Syntax

```javascript
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  if (/* operation successful */) {
    resolve(value);
  } else {
    reject(error);
  }
});
```

## Promise Methods

### Promise.all()
Executes all promises and waits for all to complete. If any promise fails, the entire operation fails.

```javascript
Promise.all([promise1, promise2])
  .then((results) => {
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    console.log("One or more promises failed:", error);
  });
```

**Key Points:**
- Returns when all promises are fulfilled
- If any promise is rejected, the entire Promise.all() is rejected
- Results are returned in the same order as input promises

### Promise.allSettled()
Waits for all promises to settle (either fulfilled or rejected) regardless of their outcome.

```javascript
Promise.allSettled([promise1, promise2])
  .then((results) => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Promise ${index} succeeded:`, result.value);
      } else {
        console.log(`Promise ${index} failed:`, result.reason);
      }
    });
  });
```

**Key Points:**
- Returns an array of objects with `status` and `value`/`reason`
- Never rejects, always resolves
- Useful when you need to know the outcome of all promises

### Promise.race()
Returns the first promise that settles (either fulfilled or rejected).

```javascript
Promise.race([promise1, promise2])
  .then((result) => {
    console.log("First promise to complete:", result);
  })
  .catch((error) => {
    console.log("First promise to fail:", error);
  });
```

**Key Points:**
- Returns the first promise that settles (fulfilled or rejected)
- Useful for timeout scenarios

### Promise.any()
Returns the first promise that fulfills. If all promises are rejected, it throws an AggregateError.

```javascript
Promise.any([promise1, promise2])
  .then((result) => {
    console.log("First successful promise:", result);
  })
  .catch((error) => {
    console.log("All promises failed:", error);
  });
```

**Key Points:**
- Returns the first fulfilled promise
- Ignores rejected promises
- Only rejects if all promises are rejected

## Promise Chaining

```javascript
fetchData()
  .then((data) => processData(data))
  .then((processed) => saveData(processed))
  .then((saved) => console.log("Success:", saved))
  .catch((error) => console.error("Error:", error))
  .finally(() => console.log("Operation completed"));
```

## Example: Fetching Data

```javascript
const fetchPlaceholder = () =>
  new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => {
        resolve(data.json());
      })
      .catch((e) => {
        reject(new Error("Failed to fetch users"));
      });
  });

const fetchGitUsers = () =>
  new Promise((resolve, reject) => {
    fetch("https://api.github.com/users")
      .then((d) => {
        resolve(d.json());
      })
      .catch((e) => {
        reject(new Error("Failed to fetch GitHub users"));
      });
  });

// Using Promise.all
Promise.all([fetchGitUsers(), fetchPlaceholder()])
  .then((d) => {
    console.log("All data:", d);
  })
  .catch((e) => {
    console.log("Error:", e.message);
  });
```

## Best Practices
1. Always handle errors with `.catch()` or `try-catch` blocks
2. Use `.finally()` for cleanup operations
3. Avoid promise nesting (use chaining instead)
4. Consider using async/await for better readability

