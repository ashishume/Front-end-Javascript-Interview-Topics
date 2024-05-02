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

// Example usage:
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
