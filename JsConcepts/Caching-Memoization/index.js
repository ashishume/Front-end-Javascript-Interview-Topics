/** caching memoization with value */

/** Function whih renders for approx 60ms */
function renderItems(x, y) {
  for (let i = 0; i < 99999999; i++) {}
  return x * y;
}

/** memoisation function which caches the previous args data and returns it if already present,
 * in this way it saves execution time for the similar arguments.
 */
function memoiseRender(func, context) {
  const res = {};
  return function (...args) {
    const argsCache = JSON.stringify(args);

    if (!res[argsCache]) {
      res[argsCache] = func.call(context || this, ...args);
    }
    return res[argsCache];
  };
}

const callMethod = memoiseRender(renderItems);

console.time("First");
console.log(callMethod(2, 7));
console.timeEnd("First"); //time prints 60ms

console.time("Second");
console.log(callMethod(2, 7));
console.timeEnd("Second"); //time prints 0.04ms
