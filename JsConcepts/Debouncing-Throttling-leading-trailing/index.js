// Q. Diff bw throttling and debouncing is
/**
/**
 * Throttling:
 * - Limits the rate at which a function can be called
 * - Ensures a function is called at most once in a specified time period
 * - Useful for events that fire frequently like scrolling, resizing
 * - Example: If throttled to 1000ms, function will execute at most once per second
 * 
 * Debouncing:
 * - Delays the execution of a function until after a specified wait time
 * - Resets the timer every time the function is called
 * - Only executes after the event has stopped firing for the specified delay
 * - Useful for search inputs, form submissions
 * - Example: If debounced to 1000ms, function will only execute after 1 second of no calls
 * 
 * Key Differences:
 * 1. Timing: Throttling guarantees execution at regular intervals, while debouncing waits for a pause
 * 2. Use Cases: Throttling is better for continuous events, debouncing for discrete events
 * 3. Execution: Throttling may execute multiple times, debouncing executes only once after delay
 */

/** Leading debounce (initial call) */
function debounceLeading(func, delay) {
  let timeoutId;
  let called = false;
  return function (...args) {
    if (!called) {
      func.apply(this, args); //if we need to pass the context then we need to call it this way
      //   func(...args);  // spread operator takes window as the default context
      called = true;
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      called = false;
    }, delay);
  };
}

/** Trailing debounce (delayed call, initial is ignored) */
function debounceTrailing(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const greet = (name) => {
  console.log(name);
};

const callMethod = debounceTrailing(greet, 300); // output: 4, 5 (first is ignored)
// const callMethod = debounceLeading(greet, 300); //output 1, 5 (first call is made rest is ignored)

callMethod("1");
callMethod("2");
callMethod("3");
callMethod("4");

setTimeout(() => {
  callMethod("5");
}, 400);

// ----------------------------------------------------------------------------------------

/** leading throttle (initial call is made) */
function throttleLeading(func, delay) {
  let isThrottled = false;
  return function (...args) {
    if (!isThrottled) {
      // Execute the func immediately if not throttled
      func.apply(this, args);

      isThrottled = true;
      // Set a timeout to reset the throttle flag after the delay
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}

/** trailing throttle (inital call is ignored) */
function throttleTrailing(func, delay) {
  let timeoutId;
  let lastArgs;
  return function (...args) {
    lastArgs = args;
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        func.apply(this, lastArgs);
      }, delay);
    }
  };
}

const callMethod1 = throttleTrailing(greet, 300); //output 4, 5 (initial call is ignored)
// const callMethod1 = throttleLeading(greet, 300); //output 1, 5 (initial call is made, and rest is ignored)

callMethod1("1");
callMethod1("2");
callMethod1("3");
callMethod1("4");

setTimeout(() => {
  callMethod1("5");
}, 400);
