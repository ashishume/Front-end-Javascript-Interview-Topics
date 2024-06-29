/**
 * fetch with timeout,=> if api doesnt respond within the given duration then 
 * fetching will get aborted with error
 * @param {*} url
 * @param {*} duration
 * @returns
 */

const fetchWithTimeout = (url, duration) => {
  return new Promise((resolve, reject) => {
    const constroller = new AbortController();
    const { signal } = constroller;
    let timerId = null;

    fetch(url, { signal })
      .then((resp) => {
        resp
          .json()
          .then((e) => {
            clearTimeout(timerId);
            resolve(e);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });

    timerId = setTimeout(() => {
      console.log("Aborted");
      constroller.abort();
    }, duration);
  });
};

fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 100)
  .then((resp) => {
    console.log(resp);
  })
  .catch((error) => {
    console.error(error);
  });
