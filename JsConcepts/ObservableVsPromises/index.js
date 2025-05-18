/**
 * Demonstrates key differences between Promises and Observables
 */

// Promise Example
const promiseExample = () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve("Promise resolved!"), 1000);
  });

  promise.then(console.log);
};

// Observable Example
const observableExample = () => {
  const { Observable } = require("rxjs");

  const observable = new Observable((subscriber) => {
    let count = 0;
    const intervalId = setInterval(() => {
      subscriber.next(`Observable value: ${count++}`);
    }, 1000);

    // Cleanup function
    return () => clearInterval(intervalId);
  });

  const subscription = observable.subscribe(console.log);

  // Unsubscribe after 5 seconds
  setTimeout(() => {
    subscription.unsubscribe();
    console.log("Observable unsubscribed");
  }, 5000);
};

// Run examples
promiseExample();
observableExample();

/**
 * Key Differences:
 *
 * 1. Value Emission
 *    - Promise: Single value, one-time resolution
 *    - Observable: Multiple values over time, continuous emission possible
 *
 * 2. Execution Timing
 *    - Promise: Executes immediately on creation
 *    - Observable: Lazy execution, starts only on subscription
 *
 * 3. Cancellation
 *    - Promise: Cannot be cancelled once started
 *    - Observable: Supports cancellation via unsubscribe()
 *
 * 4. Transformation Capabilities
 *    - Promise: Basic chaining with .then() and .catch()
 *    - Observable: Rich operator ecosystem (map, filter, merge, etc.)
 *
 * Why Angular Uses Observables:
 * - Better suited for reactive programming patterns
 * - Handles complex data streams and events
 * - Provides powerful operators for data transformation
 * - Supports cancellation and cleanup
 */
