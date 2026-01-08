# Promise Chaining in JavaScript

Promise chaining is a powerful technique in JavaScript that allows you to execute multiple asynchronous operations sequentially, where each operation depends on the result of the previous one. This approach helps avoid the "callback hell" problem and makes asynchronous code more readable and maintainable.

## Understanding Promise Chaining

When one function is dependent upon a previous function's result, you can chain promises using `.then()` to pass the result from one promise to the next. Each `.then()` returns a new promise, allowing you to chain multiple operations together.

## Basic Example

```javascript
function asyncOperation1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("First result");
    }, 1000);
  });
}

function asyncOperation2(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data + " Second result");
    }, 1000);
  });
}

asyncOperation1()
  .then((result) => {
    console.log(result); // "First result"
    return asyncOperation2(result);
  })
  .then((result) => {
    console.log(result); // "First result Second result"
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
```

## Key Concepts

### 1. Returning Values in `.then()`

When you return a value from a `.then()` handler:

- If you return a **non-promise value**, it's automatically wrapped in a resolved promise
- If you return a **promise**, the next `.then()` waits for that promise to resolve

```javascript
// Returning a non-promise value
promise
  .then((result) => {
    return result * 2; // Automatically wrapped in Promise.resolve(result * 2)
  })
  .then((doubled) => {
    console.log(doubled);
  });

// Returning a promise
promise
  .then((result) => {
    return fetch(`/api/data/${result}`); // Returns a promise
  })
  .then((response) => {
    return response.json(); // Also returns a promise
  })
  .then((data) => {
    console.log(data);
  });
```

### 2. Error Handling

Errors in promise chains can be caught using `.catch()`. A single `.catch()` at the end of the chain will catch any error that occurs in any of the preceding promises.

```javascript
asyncOperation1()
  .then((result) => asyncOperation2(result))
  .then((result) => asyncOperation3(result))
  .catch((error) => {
    // Catches errors from any of the above operations
    console.error("Error:", error);
  });
```

### 3. Multiple Sequential Operations

Promise chaining is ideal for operations that must happen in sequence:

```javascript
fetch("/api/user")
  .then((response) => response.json())
  .then((user) => fetch(`/api/posts/${user.id}`))
  .then((response) => response.json())
  .then((posts) => fetch(`/api/comments/${posts[0].id}`))
  .then((response) => response.json())
  .then((comments) => {
    console.log("Comments:", comments);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
```

## Benefits of Promise Chaining

1. **Readability**: Code reads top-to-bottom, making the flow easier to understand
2. **Error Handling**: Single `.catch()` can handle errors from the entire chain
3. **Avoids Callback Hell**: No nested callbacks, leading to cleaner code
4. **Composability**: Easy to add or remove steps in the chain

## Common Patterns

### Transforming Data Through the Chain

```javascript
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => data.filter((item) => item.active))
  .then((activeItems) => activeItems.map((item) => item.name))
  .then((names) => names.sort())
  .then((sortedNames) => {
    console.log("Sorted active names:", sortedNames);
  });
```

### Conditional Chaining

```javascript
fetch("/api/user")
  .then((response) => response.json())
  .then((user) => {
    if (user.isAdmin) {
      return fetch("/api/admin-data");
    } else {
      return fetch("/api/user-data");
    }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Data:", data);
  });
```

## Best Practices

1. **Always return promises**: Make sure each `.then()` returns a value or promise
2. **Handle errors**: Always include `.catch()` for error handling
3. **Avoid nesting**: Use chaining instead of nesting `.then()` calls
4. **Keep chains focused**: Don't make chains too long; consider breaking them into functions

## Comparison with Async/Await

While promise chaining is powerful, async/await provides a more synchronous-looking syntax:

```javascript
// Promise Chaining
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => processData(data))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// Async/Await (equivalent)
async function fetchAndProcess() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    const result = await processData(data);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

Both approaches are valid, and the choice often comes down to personal preference and the specific use case.
