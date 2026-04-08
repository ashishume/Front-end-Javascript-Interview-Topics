/** circuit breaker method */
const circuitBreaker = (fn, maxFailures, resetTimeout) => {
  let failures = 0;
  let nextTry = 0; // timestamp when we can retry

  return (...args) => {
    const now = Date.now();

    // 🚫 Circuit is OPEN
    if (now < nextTry) {
      console.error("Circuit open - request blocked");
      return;
    }

    try {
      const result = fn(...args);

      // ✅ Success → reset state
      failures = 0;
      return result;
    } catch (err) {
      failures++;

      // ❌ Open circuit if threshold reached
      if (failures >= maxFailures) {
        nextTry = now + resetTimeout;
      }

      console.error("Execution failed");
    }
  };
};

const testFunc = () => {
  let count = 0;
  return () => {
    count++;

    if (count < 4) {
      throw "Failed";
    } else {
      return "passed";
    }
  };
};
const t = testFunc();

const r = circuitBreaker(t, 3, 200);

/** first 3 attempts failed the method */
r();
r();
r();

/** in this attempt the maxTIme limit passed and shown message */
r();

/** in the final attempt the count got greater than 4 and shows passed message which is not a error message */
setTimeout(() => {
  console.log(r());
}, 300);
