/**
 * fetch with timeout,=> if api doesnt respond within the given duration then
 * fetching will get aborted with error
 * @param {*} url
 * @param {*} duration
 * @returns
 */

const fetchWithTimeout = (url, duration) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const { signal } = controller;
    let timerId = null;

    fetch(url, { signal }).then((resp) => {
      resp
        .json()
        .then((e) => {
          clearTimeout(timerId);
          resolve(e);
        })
        .catch((error) => {
          reject(error);
        });
    });

    timerId = setTimeout(() => {
      console.log("aborted");
      controller.abort();
    }, duration);
  });
};

fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 200)
  .then((resp) => {
    console.log(resp);
  })
  .catch((error) => {
    console.error(error);
  });
