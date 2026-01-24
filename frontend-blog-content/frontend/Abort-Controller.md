# Abort Controller in JavaScript

## Overview
The AbortController interface represents a controller object that allows you to abort one or more Web requests as and when desired. It's particularly useful for canceling fetch requests, preventing race conditions, and managing multiple API calls.

## Basic Usage

```javascript
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
```

## Key Concepts

### Creating an AbortController
```javascript
const controller = new AbortController();
const signal = controller.signal;
```

### Aborting a Request
```javascript
controller.abort();
```

### Using with Fetch
When the fetch request is initiated, we pass in the AbortSignal as an option inside the request's options object. This associates the signal and controller with the fetch request and allows us to abort it.

## Use Cases

### 1. Handling Race Conditions
AbortController can be used to handle race conditions and avoid multiple API calls, ensuring that new data doesn't overlap with the last API call.

```javascript
let currentController;

async function fetchData(query) {
  // Abort previous request if exists
  if (currentController) {
    currentController.abort();
  }
  
  currentController = new AbortController();
  
  try {
    const response = await fetch(`/api/search?q=${query}`, {
      signal: currentController.signal
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was aborted');
    } else {
      console.error('Fetch error:', error);
    }
  }
}
```

### 2. Timeout Implementation
```javascript
function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  return fetch(url, { signal: controller.signal })
    .then(response => {
      clearTimeout(timeoutId);
      return response;
    })
    .catch(error => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    });
}
```

## Properties

- **signal**: Returns an AbortSignal object instance, which can be used to communicate with/abort a DOM request

## Methods

- **abort()**: Aborts a DOM request before it has completed. This is able to abort fetch requests, consumption of any response bodies, and streams.

## Error Handling

When a request is aborted, the promise rejects with a `DOMException` named `AbortError`. Always check for this specific error:

```javascript
fetch(url, { signal })
  .then(response => response.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request was aborted');
    } else {
      console.error('Other error:', error);
    }
  });
```

## Browser Support
AbortController is supported in all modern browsers. For older browsers, you may need a polyfill.

## Best Practices
1. Always check if the error is an AbortError before handling it
2. Clean up controllers when components unmount
3. Use AbortController to prevent memory leaks from pending requests
4. Combine with timeout implementations for better request management
