// Q. Diff bw throttling and debouncing is
/**
 *
 * Throttling ensures that a function is only called at most once in a specified period. It controls the rate at which the function executes by guaranteeing that it will only be called once within a given time frame, regardless of how many times the event is triggered.
 * 
 * 
 * Debouncing ensures that a function is only called once after a specified period of inactivity. It delays the execution of the function until after the event has stopped being triggered for a certain period.

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
