//Promise with limit
/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  return async function (...args) {
    const promise = fn(...args);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);
    });

    return Promise.race([promise, timeoutPromise]);
  };
};

// Example 1
const limited = timeLimit((t) => new Promise((res) => setTimeout(res, t)), 100);
limited(150).catch(console.log); // "Time Limit Exceeded" at t=100ms

//Example 2
const func = function (t) {
  console.log(t);
};
const limited2 = timeLimit(func, 200);
limited2(150); // 150
