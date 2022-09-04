/**
 * When the fetch request is initiated, we pass in the AbortSignal as an option
 * inside the request's options object (the {signal} below).
 * This associates the signal and controller with the fetch request
 * and allows us to abort it by calling AbortController.abort(), as seen
 * below in the second event listener.
 */

const controller = new AbortController();
const signal = controller.signal;

fetch("https://jsonplaceholder.typicode.com/todos/1", { signal })
  .then((d) => d.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(`Download error: ${err.message}`);
  });
