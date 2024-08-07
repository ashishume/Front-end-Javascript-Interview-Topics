/** circuit breaker method */

const circuitBreaker = (fn, maxAttempts, thresholdTimeLimit) => {
  let failedAttempts = 0;
  let isClosed = false;
  let lastTimeFailure = 0;
  return function (...args) {
    if (isClosed) {
      const diff = Date.now() - lastTimeFailure;
      if (diff > thresholdTimeLimit) {
        isClosed = false;
      } else {
        console.error("Service unavailable");
        return;
      }
    }

    try {
      const result = fn(...args);
      failedAttempts = 0;
      return result;
    } catch (e) {
      failedAttempts++;
      lastTimeFailure = Date.now();
      if (failedAttempts >= maxAttempts) {
        isClosed = true;
      }
      console.error("Error");
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
