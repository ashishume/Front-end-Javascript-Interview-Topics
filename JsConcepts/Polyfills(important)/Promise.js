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

//---- Independent promise.all() polyfill
function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let result = [];

    if (promises.length === 0) resolve(result);

    let pendingPromises = promises.length;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        result[index] = value;
        pendingPromises--;

        if (pendingPromises === 0) resolve(result);
      }, reject);
    });
  });
}

/** Promise all example using the above polyfill */
const samplePromise1 = new Promise((res, rej) => {
  setTimeout(() => {
    res([1, 2, 4]);
  }, 2000);
});
const samplePromise2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("rejected");
  }, 3000);
});

// PromiseAll([samplePromise1, samplePromise2]).then((d) => {
//   console.log(d);
// });

/** independent promise.allSettled()  */
function PromiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    if (promises.length === 0) resolve(results);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) resolve(results);
        });
    });
  });
}

// PromiseAllSettled([samplePromise1, samplePromise2])
//   .then((d) => {
//     console.log(d);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

/** Promise.any()  polyfill */
function PromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) throw new AggregateError("no promises found");

    let errors = [];
    let rejectedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((reason) => {
          rejectedCount++;
          errors[index] = errors;
          if (rejectedCount === promises.length) reject(new AggregateError("all rejected"));
        });
    });
  });
}

// PromiseAny([samplePromise1, samplePromise2])
//   .then((d) => {
//     console.log(d);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

/** Promise.race()  polyfill */
function PromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}
