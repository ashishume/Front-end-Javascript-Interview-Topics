let counter = 0;

// Function to increment the counter and send it to the main thread
function incrementCounter() {
  counter++;
  postMessage(counter);
}

// Set up an interval to increment the counter every second
setInterval(incrementCounter, 1000);
