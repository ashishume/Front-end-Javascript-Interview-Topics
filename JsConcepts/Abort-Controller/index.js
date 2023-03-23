/**
 * When the fetch request is initiated, we pass in the AbortSignal as an option
 * inside the request's options object (the {signal} below).
 * This associates the signal and controller with the fetch request
 * and allows us to abort it by calling AbortController.abort(), as seen
 * below in the second event listener.
 */

let controller;
const url = "https://jsonplaceholder.typicode.com/todos/1";

const downloadBtn = document.querySelector(".download");
const abortBtn = document.querySelector(".abort");

downloadBtn.addEventListener("click", fetchVideo);

abortBtn.addEventListener("click", () => {
  if (controller) {
    controller.abort();
    console.log("Download aborted");
  }
});

function fetchVideo() {
  controller = new AbortController();
  const signal = controller.signal;
  fetch(url, { signal })
    .then((response) => {
      console.log("Download complete", response);
    })
    .catch((err) => {
      console.error(`Download error: ${err.message}`);
    });
}
