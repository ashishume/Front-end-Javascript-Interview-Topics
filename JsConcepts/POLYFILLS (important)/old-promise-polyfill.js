/** Code refer: @link https://medium.com/@manojsingh047/polyfill-for-javascript-promise-81053b284e37 */

function CustomPromise(executor) {
  let onResolve,
    onReject,
    isCalled = false,
    isResolved = false,
    isRejected = false,
    value,
    error;

  function resolve(val) {
    isResolved = true;
    value = val;
    /** if resolve is called for sync operation */
    if (typeof onResolve === "function" && !isCalled) {
      onResolve(val);
      isCalled = true;
    }
  }
  function reject(err) {
    isRejected = true;
    error = err;
    /** if reject is called for sync operation */
    if (typeof onReject === "function" && !isCalled) {
      onReject(err);
      isCalled = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;
    if (isResolved && !isCalled) {
      onResolve(value);
      isCalled = true;
    }
    return this;
  };
  this.catch = function (catchHandler) {
    onReject = catchHandler;
    if (!isCalled && isRejected) {
      onReject(error);
      isCalled = true;
    }
    return this;
  };

  executor(resolve, reject);
}

// new CustomPromise((res, rej) => {
//   fetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then((d) => d.json())
//     .then((result) => res(result));
// })
//   .then((d) => {
//     console.log(d);
//   })
//   .catch((err) => console.log(err));

CustomPromise.all = function (promises) {
  return new CustomPromise(function executor(resolve, reject) {
    let count = 0;
    let res = [];

    if (promises.length === 0) {
      resolve(promises);
      return;
    }

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((val) => {
          done(val, i);
        })
        .catch((err) => reject(err));
    }

    function done(val, i) {
      res[i] = val;
      ++count;
      if (promises.length === count) resolve(res);
    }
  });
};
