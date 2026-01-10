# Async/Await vs Promises

## Overview
Both **Promises** and **async/await** are used in JavaScript to handle asynchronous operations. `async/await` is syntactic sugar built on top of Promises, introduced in ES2017, that allows you to write asynchronous code in a more synchronous and readable manner.

## Promises

### Characteristics
- Contains 3 states: **pending**, **fulfilled**, or **rejected**
- Uses `.then()`, `.catch()`, and `.finally()` methods
- Chain-based syntax
- Introduced in ES6 (ES2015)

### Promise Example

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
};

// Using the Promise
fetchData()
  .then((data) => {
    console.log(data); // Logs "Data fetched" after 2 seconds
    return processData(data);
  })
  .then((processed) => {
    console.log(processed);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Operation completed");
  });
```

### Promise with Error Handling

```javascript
const fetchUser = (userId) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("User ID is required"));
      return;
    }
    
    setTimeout(() => {
      resolve({ id: userId, name: "John Doe" });
    }, 1000);
  });
};

fetchUser(123)
  .then((user) => {
    console.log("User:", user);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

## Async/Await

### Characteristics
- Built on top of Promises
- Makes asynchronous code look synchronous
- Uses `try-catch` for error handling
- Functions must be declared with `async` keyword
- `await` can only be used inside `async` functions

### Async/Await Example

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
};

// Using async/await
const getData = async () => {
  try {
    const data = await fetchData();
    console.log(data); // Logs "Data fetched" after 2 seconds
    const processed = await processData(data);
    console.log(processed);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Operation completed");
  }
};

getData();
```

### Async/Await with Error Handling

```javascript
const fetchUser = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: userId, name: "John Doe" };
};

const getUser = async () => {
  try {
    const user = await fetchUser(123);
    console.log("User:", user);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

getUser();
```

## Comparison

### Side-by-Side Example

```javascript
// Promise approach
function fetchUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return response.json();
    })
    .then(user => {
      return fetch(`/api/posts/${user.id}`);
    })
    .then(response => response.json())
    .then(posts => {
      return { user, posts };
    })
    .catch(error => {
      console.error("Error:", error);
      throw error;
    });
}

// Async/await approach
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const user = await response.json();
    
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
    
    return { user, posts };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
```

## Key Differences

| Feature | Promises | Async/Await |
|---------|----------|-------------|
| **Syntax** | Chain-based (`.then()`, `.catch()`) | Synchronous-looking (try-catch) |
| **Readability** | Can become nested (callback hell) | More readable, linear flow |
| **Error Handling** | `.catch()` method | `try-catch` blocks |
| **Debugging** | Harder to debug | Easier to debug (stack traces) |
| **Variable Scope** | Each `.then()` has its own scope | Same scope throughout function |
| **Conditional Logic** | More complex | Easier with if/else |

## When to Use What

### Use Promises When:
- Working with Promise utilities (`Promise.all()`, `Promise.race()`, etc.)
- Need fine-grained control over promise chains
- Working with libraries that return promises directly
- Simple one-off async operations

### Use Async/Await When:
- Need sequential async operations
- Complex error handling scenarios
- Want more readable code
- Working with multiple dependent async calls
- Need to use conditional logic with async operations

## Advanced Patterns

### Parallel Execution with Promise.all()

```javascript
// Promise approach
Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3)
])
  .then(users => {
    console.log("All users:", users);
  })
  .catch(error => {
    console.error("Error:", error);
  });

// Async/await approach
async function fetchAllUsers() {
  try {
    const users = await Promise.all([
      fetchUser(1),
      fetchUser(2),
      fetchUser(3)
    ]);
    console.log("All users:", users);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### Sequential vs Parallel

```javascript
// Sequential (one after another)
async function sequential() {
  const user1 = await fetchUser(1); // Wait for this
  const user2 = await fetchUser(2); // Then wait for this
  const user3 = await fetchUser(3); // Then wait for this
  return [user1, user2, user3];
}

// Parallel (all at once)
async function parallel() {
  const [user1, user2, user3] = await Promise.all([
    fetchUser(1), // All start at the same time
    fetchUser(2),
    fetchUser(3)
  ]);
  return [user1, user2, user3];
}
```

### Error Handling Patterns

```javascript
// Promise - multiple catch blocks
fetchData()
  .then(data => processData(data))
  .catch(processError => {
    console.error("Processing error:", processError);
    return null;
  })
  .then(result => saveData(result))
  .catch(saveError => {
    console.error("Save error:", saveError);
  });

// Async/await - multiple try-catch
async function handleData() {
  let data;
  try {
    data = await fetchData();
  } catch (fetchError) {
    console.error("Fetch error:", fetchError);
    return;
  }
  
  let processed;
  try {
    processed = await processData(data);
  } catch (processError) {
    console.error("Processing error:", processError);
    return;
  }
  
  try {
    await saveData(processed);
  } catch (saveError) {
    console.error("Save error:", saveError);
  }
}
```

## Best Practices

1. **Prefer async/await** for better readability in most cases
2. **Use Promise.all()** for parallel operations
3. **Always handle errors** with try-catch or .catch()
4. **Don't mix** async/await with .then() unnecessarily
5. **Use async/await** for sequential dependent operations
6. **Use Promises** when working with Promise utility methods

## Key Takeaways

1. **async/await is syntactic sugar** over Promises
2. **Both achieve the same result**, but async/await is more readable
3. **async/await uses try-catch** for error handling
4. **Promises use .then()/.catch()** for chaining and error handling
5. **async/await makes code look synchronous** but is still asynchronous
6. **You can use both together** - async/await functions return Promises
7. **Choose based on readability and use case**

