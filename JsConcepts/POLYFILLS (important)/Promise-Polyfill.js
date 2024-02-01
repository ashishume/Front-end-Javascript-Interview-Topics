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
