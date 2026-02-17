# Web Workers in JavaScript

## Overview
Web Workers allow you to run JavaScript code in background threads, separate from the main execution thread. This enables performing heavy computations without blocking the UI, improving application responsiveness.

## Basic Syntax

```javascript
// Main thread
const worker = new Worker("worker.js");

// Send message to worker
worker.postMessage("Hello from main thread");

// Receive message from worker
worker.onmessage = function(event) {
  console.log("Message from worker:", event.data);
};

// Handle errors
worker.onerror = function(error) {
  console.error("Worker error:", error);
};

// Terminate worker
worker.terminate();
```

## Worker File (worker.js)

```javascript
// Listen for messages from main thread
self.onmessage = function(event) {
  console.log("Message from main thread:", event.data);
  
  // Perform heavy computation
  const result = performHeavyTask(event.data);
  
  // Send result back to main thread
  self.postMessage(result);
};

function performHeavyTask(data) {
  // Heavy computation here
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  return sum;
}
```

## Complete Example

### Main Thread (index.js)

```javascript
let counterWorker;

function startCounter() {
  if (typeof Worker !== "undefined") {
    if (!counterWorker) {
      counterWorker = new Worker("counterWorker.js");
      
      counterWorker.onmessage = function(event) {
        document.getElementById("counter").innerText = event.data;
      };
    }
  } else {
    console.log("Web Workers are not supported");
  }
}

function stopCounter() {
  if (counterWorker) {
    counterWorker.terminate();
    counterWorker = undefined;
  }
}
```

### Worker Thread (counterWorker.js)

```javascript
let count = 0;

function incrementCounter() {
  count++;
  self.postMessage(count);
  setTimeout(incrementCounter, 1000);
}

incrementCounter();
```

## Inline Workers

```javascript
// Create worker from string
const workerCode = `
  self.onmessage = function(e) {
    const result = e.data * 2;
    self.postMessage(result);
  };
`;

const blob = new Blob([workerCode], { type: "application/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

worker.onmessage = function(e) {
  console.log("Result:", e.data);
};

worker.postMessage(5); // Sends 10 back
```

## Shared Workers

Shared Workers can be accessed by multiple scripts/windows:

```javascript
// Creating shared worker
const sharedWorker = new SharedWorker("shared-worker.js");

sharedWorker.port.onmessage = function(event) {
  console.log("Message:", event.data);
};

sharedWorker.port.postMessage("Hello");
```

## Limitations

Web Workers have some restrictions:
- **No DOM access**: Cannot access `document`, `window`, or DOM elements
- **No parent object access**: Cannot access parent's variables/functions
- **Communication only via messages**: Use `postMessage()` and `onmessage`
- **Limited APIs**: Some browser APIs are not available

## Use Cases

1. **Heavy computations**: Mathematical calculations, data processing
2. **Image processing**: Manipulating image data
3. **Data parsing**: Parsing large JSON/XML files
4. **Background tasks**: Periodic data synchronization

## Best Practices

```javascript
// Always check for support
if (typeof Worker !== "undefined") {
  // Use worker
} else {
  // Fallback
}

// Clean up workers when done
worker.terminate();

// Handle errors
worker.onerror = function(error) {
  console.error("Worker error:", error);
};
```

## Key Points
- Enables background processing without blocking UI
- Communication via `postMessage()` and `onmessage`
- No DOM access - workers run in isolated context
- Useful for CPU-intensive tasks
- Remember to terminate workers when no longer needed

