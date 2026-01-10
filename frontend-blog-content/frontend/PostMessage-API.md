# PostMessage API in JavaScript

## Overview
The PostMessage API allows secure cross-origin communication between windows, iframes, and web workers. It provides a safe way to exchange data between different origins without violating the same-origin policy.

## Basic Syntax

```javascript
// Send message
targetWindow.postMessage(message, targetOrigin, [transfer]);

// Receive message
window.addEventListener("message", (event) => {
  // Handle message
});
```

## Parameters

- **message**: Data to be sent (any serializable object)
- **targetOrigin**: URL of target window ("*" allows any origin, but not recommended)
- **transfer**: Optional array of Transferable objects

## Basic Examples

### 1. Parent Window to Iframe

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector("iframe");
  
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      {
        type: "PARENT_MESSAGE",
        data: "Hello from parent!",
      },
      "https://trusted-origin.com" // Target origin
    );
  }
});
```

### 2. Iframe to Parent Window

```javascript
// Inside iframe
window.parent.postMessage(
  {
    type: "IFRAME_MESSAGE",
    data: "Hello from iframe!",
  },
  "*" // ⚠️ Use specific origin in production
);
```

### 3. Listening for Messages

```javascript
window.addEventListener("message", (event) => {
  // ⚠️ Always verify the sender's origin
  if (event.origin !== "https://trusted-origin.com") {
    return; // Ignore messages from untrusted origins
  }
  
  // Handle different message types
  switch (event.data.type) {
    case "PARENT_MESSAGE":
      console.log("Received from parent:", event.data.data);
      break;
    case "IFRAME_MESSAGE":
      console.log("Received from iframe:", event.data.data);
      break;
  }
});
```

## Complete Parent-Iframe Communication

### Parent Window Code

```javascript
class ParentWindow {
  constructor() {
    this.iframe = document.querySelector("iframe");
    this.init();
  }
  
  init() {
    // Send initial message to iframe
    this.sendToIframe({
      type: "INIT",
      data: { config: "parent-config" },
    });
    
    // Listen for iframe messages
    window.addEventListener("message", this.handleMessage.bind(this));
  }
  
  sendToIframe(message) {
    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(message, "*");
      // ⚠️ In production, use specific origin: "https://iframe-origin.com"
    }
  }
  
  handleMessage(event) {
    // In production, verify origin
    // if (event.origin !== "https://iframe-origin.com") return;
    
    switch (event.data.type) {
      case "IFRAME_READY":
        console.log("Iframe is ready");
        break;
      case "DATA_UPDATE":
        console.log("Received data update:", event.data.data);
        this.handleDataUpdate(event.data.data);
        break;
    }
  }
  
  handleDataUpdate(data) {
    // Process data from iframe
  }
}

const parentWindow = new ParentWindow();
```

### Iframe Code

```javascript
class IframeWindow {
  constructor() {
    this.init();
  }
  
  init() {
    // Notify parent that iframe is ready
    this.sendToParent({
      type: "IFRAME_READY",
      data: { status: "ready" },
    });
    
    // Listen for parent messages
    window.addEventListener("message", this.handleMessage.bind(this));
  }
  
  sendToParent(message) {
    window.parent.postMessage(message, "*");
    // ⚠️ In production, use specific origin: "https://parent-origin.com"
  }
  
  handleMessage(event) {
    // In production, verify origin
    // if (event.origin !== "https://parent-origin.com") return;
    
    switch (event.data.type) {
      case "INIT":
        console.log("Received init config:", event.data.data);
        this.initialize(event.data.data);
        break;
      case "UPDATE_REQUEST":
        this.sendToParent({
          type: "DATA_UPDATE",
          data: { value: "updated-data" },
        });
        break;
    }
  }
  
  initialize(config) {
    // Initialize iframe with config from parent
  }
}

const iframeWindow = new IframeWindow();
```

## Window-to-Window Communication

```javascript
// Open new window
const newWindow = window.open("https://example.com", "newWindow");

// Wait for window to load, then send message
newWindow.addEventListener("load", () => {
  newWindow.postMessage(
    { type: "GREETING", message: "Hello!" },
    "https://example.com"
  );
});

// Listen for messages from new window
window.addEventListener("message", (event) => {
  if (event.origin !== "https://example.com") return;
  
  if (event.data.type === "RESPONSE") {
    console.log("Response:", event.data.message);
  }
});
```

## Web Worker Communication

### Main Thread

```javascript
const worker = new Worker("worker.js");

// Send message to worker
worker.postMessage({ type: "CALCULATE", data: [1, 2, 3, 4, 5] });

// Listen for messages from worker
worker.addEventListener("message", (event) => {
  console.log("Result from worker:", event.data);
});

// Handle errors
worker.addEventListener("error", (error) => {
  console.error("Worker error:", error);
});
```

### Worker Thread (worker.js)

```javascript
// Listen for messages from main thread
self.addEventListener("message", (event) => {
  if (event.data.type === "CALCULATE") {
    const result = event.data.data.reduce((a, b) => a + b, 0);
    
    // Send result back to main thread
    self.postMessage({ type: "RESULT", value: result });
  }
});
```

## Message Event Properties

```javascript
window.addEventListener("message", (event) => {
  console.log("Origin:", event.origin);        // Sender's origin
  console.log("Source:", event.source);        // Window reference
  console.log("Data:", event.data);            // Message data
  console.log("Type:", event.type);            // "message"
});
```

## Security Best Practices

### 1. Always Verify Origin

```javascript
window.addEventListener("message", (event) => {
  // ✅ Good: Verify origin
  const allowedOrigins = [
    "https://trusted-site.com",
    "https://another-trusted-site.com"
  ];
  
  if (!allowedOrigins.includes(event.origin)) {
    console.warn("Message from untrusted origin:", event.origin);
    return;
  }
  
  // Process message
  handleMessage(event.data);
});
```

### 2. Use Specific Target Origin

```javascript
// ✅ Good: Specific origin
iframe.contentWindow.postMessage(data, "https://trusted-origin.com");

// ❌ Bad: Wildcard (allows any origin)
iframe.contentWindow.postMessage(data, "*");
```

### 3. Validate Message Data

```javascript
window.addEventListener("message", (event) => {
  if (event.origin !== "https://trusted-origin.com") return;
  
  // Validate message structure
  if (!event.data || typeof event.data !== "object") {
    console.error("Invalid message format");
    return;
  }
  
  if (!event.data.type) {
    console.error("Message missing type");
    return;
  }
  
  // Process valid message
  handleMessage(event.data);
});
```

### 4. Use Message Types

```javascript
// Define message types
const MessageTypes = {
  INIT: "INIT",
  UPDATE: "UPDATE",
  ERROR: "ERROR"
};

// Send typed messages
postMessage({ type: MessageTypes.UPDATE, payload: data });

// Handle typed messages
window.addEventListener("message", (event) => {
  switch (event.data.type) {
    case MessageTypes.INIT:
      handleInit(event.data);
      break;
    case MessageTypes.UPDATE:
      handleUpdate(event.data);
      break;
    case MessageTypes.ERROR:
      handleError(event.data);
      break;
  }
});
```

## Transferable Objects

For better performance with large data:

```javascript
// Transfer ArrayBuffer (moves ownership, original becomes unusable)
const buffer = new ArrayBuffer(1024);
worker.postMessage({ data: buffer }, [buffer]);
// buffer is now transferred, not copied

// Transfer ImageBitmap
const imageBitmap = await createImageBitmap(image);
canvas.transferControlToOffscreen();
worker.postMessage({ image: imageBitmap }, [imageBitmap]);
```

## Error Handling

```javascript
function safePostMessage(target, message, origin) {
  try {
    if (target && typeof target.postMessage === "function") {
      target.postMessage(message, origin);
    } else {
      console.error("Target window not available");
    }
  } catch (error) {
    console.error("PostMessage error:", error);
  }
}

// Usage
safePostMessage(iframe.contentWindow, data, "https://trusted-origin.com");
```

## Common Use Cases

### 1. Authentication Token Sharing

```javascript
// Parent sends auth token to iframe
iframe.contentWindow.postMessage(
  { type: "AUTH_TOKEN", token: userToken },
  "https://iframe-origin.com"
);
```

### 2. Form Data Collection

```javascript
// Iframe collects form data and sends to parent
window.parent.postMessage(
  { type: "FORM_SUBMIT", formData: formData },
  "https://parent-origin.com"
);
```

### 3. Resize Notifications

```javascript
// Iframe notifies parent of size changes
const resizeObserver = new ResizeObserver(() => {
  window.parent.postMessage(
    { type: "RESIZE", dimensions: { width, height } },
    "https://parent-origin.com"
  );
});
```

## Browser Support

PostMessage is supported in:
- Chrome 1+
- Firefox 3+
- Safari 4+
- Edge 12+
- IE 8+

## Summary

The PostMessage API enables secure cross-origin communication between different browsing contexts. It's essential for iframe communication, web worker messaging, and window-to-window data exchange. Always verify message origins and validate data to ensure security.

