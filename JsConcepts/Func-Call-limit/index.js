/**
 * Implement a function rateLimit which takes a function, a limit, and a time.
 * The function should be called no more than limit times in time milliseconds.
 */
function funcCallLimit(func, limit, time) {
  let calls = [];

  return function (...args) {
    const now = Date.now();

    // Remove timestamps older than `time` ms
    calls = calls.filter((timestamp) => now - timestamp < time);

    if (calls.length < limit) {
      calls.push(now);
      func.apply(this, args);
    }
    // Else: silently ignore the call
  };
}

const funcCall = funcCallLimit(console.log, 3, 1000); // 3 calls per 1 second

funcCall("Hello");
funcCall("World");
funcCall("!");
funcCall("not called");
