const data = new Promise((resolve, reject) => {
  fetch("http://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((value) => {
      resolve(value);
    })
    .catch((e) => {
      reject("Failed");
    });
});

//promise 1
const fetchPlaceholder = () =>
  new Promise((resolve, reject) => {
    // setTimeout(() => {
    //   // reject(new Error("failed"));
    // }, 1000);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => {
        resolve(data.json());
      })
      .catch((e) => {
        reject(new Error("Went wrong1111111"));
      });
  });

//promise 2
const fetchGitUsers = () =>
  new Promise((resolve, reject) => {
    fetch("https://api.github.com/users")
      .then((d) => {
        resolve(d.json());
      })
      .catch((e) => {
        reject(new Error("Went wrong22222"));
      });
  });

/** prints when all of the promises are completed, if any one of them gets failed then it
 * doesnt print anything in the then statement,
 * goes into the catch statement
 */
Promise.all([fetchGitUsers(), fetchPlaceholder()])
  .then((d) => {
    console.log("all",d);
  })
  .catch((e) => {
    console.log(e.message);
  })
  .finally((d) => {});

/** when all the promises are independent of each other, whether they have failed/completed
 * it prints the status after everything is settled with a status of rejection or fulfillment
 * it prints as an object ==> {status: 'rejected', reason: Promise}
 * ==>{status: 'fulfilled', value: Array(10)}
 */
Promise.allSettled([fetchGitUsers(), fetchPlaceholder()])
  .then((d) => {
    console.log("all settled", d);
  })
  .catch((e) => {
    console.log(e);
  });

/** whichever promise finishes first(only one promise) will get returned as the callback,
 * it only prints the resolved ones, ignores the rejected ones.
 * if none of the promises gets resolved then, throws an
 * "AggregateError: All promises were rejected"
 */
Promise.any([fetchGitUsers(), fetchPlaceholder()])
  .then((d) => {
    console.log("any", d);
  })
  .catch((e) => {
    console.log("any error", e);
  });

/** whenever any promises gets fulfilled or rejected first (only one promise),
 * then it gets returned as a value if fullfilled, or reason if rejected
 * */
Promise.race([fetchGitUsers(), fetchPlaceholder()])
  .then((d) => {
    console.log("race", d);
  })
  .catch((e) => {
    console.log("race error", e);
  });

//Async await, serves the same purpose as promise
const fetchData = async () => {
  try {
    const data1 = await fetchGitUsers();
    const data2 = await fetchPlaceholder();
    console.log(data1);
    console.log(data2);
  } catch (e) {
    console.log("===>", e.message);
  }
};
