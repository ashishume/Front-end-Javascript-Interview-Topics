let counterWorker;

function startCounter() {
  if (typeof Worker !== "undefined") {
    if (!counterWorker) {
      counterWorker = new Worker("counterWorker.js");
      // Listen for messages from the worker
      counterWorker.onmessage = function (event) {
        document.getElementById("counter").innerText = event.data;
      };
    }
  } else {
    console.log("Web Workers are not supported in this browser.");
  }
}

function stopCounter() {
  if (counterWorker) {
    counterWorker.terminate();
    counterWorker = undefined;
  }
}
