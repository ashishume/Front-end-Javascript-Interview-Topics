## Both Promises and async/await are used in JavaScript to handle asynchronous operations.

### Promise (contains 3 states ==> pending, fulfilled, or rejected.)

### async/await is syntactic sugar built on top of Promises, introduced in ES2017. It allows you to write asynchronous code in a more synchronous and readable manner.

```
// Example of a Promise
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
  })
  .catch((error) => {
    console.error(error);
  });
```

```
// Example of async/await
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
  } catch (error) {
    console.error(error);
  }
};

getData();

```