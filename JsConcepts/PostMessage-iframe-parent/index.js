/**
 * PostMessage API allows secure cross-origin communication between windows/iframes
 * Syntax: window.postMessage(message, targetOrigin, [transfer])
 *
 * Parameters:
 * - message: Data to be sent (any serializable object)
 * - targetOrigin: URL of target window ("*" allows any origin)
 * - transfer: Optional array of Transferable objects
 */

// Example 1: Parent window sending message to iframe
document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector("iframe");
  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        type: "PARENT_MESSAGE",
        data: "Hello from parent!",
      },
      "https://trusted-origin.com"
    );
  }
});

// Example 2: Iframe sending message to parent
window.parent.postMessage(
  {
    type: "IFRAME_MESSAGE",
    data: "Hello from iframe!",
  },
  "*"
);

// Example 3: Listening for messages
window.addEventListener("message", (event) => {
  // Always verify the sender's origin
  if (event.origin !== "https://trusted-origin.com") return;

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

// Check if we're in the parent window or iframe
const isParent = window.self === window.top;

// Parent window code
const parentWindow = {
  init() {
    // Send initial message to iframe
    this.sendToIframe({
      type: "INIT",
      data: { config: "parent-config" },
    });

    // Listen for iframe messages
    window.addEventListener("message", this.handleMessage.bind(this));
  },

  sendToIframe(message) {
    const iframe = document.querySelector("iframe");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, "*");
    }
  },

  handleMessage(event) {
    // In a real application, you should verify the origin
    // if (event.origin !== "https://trusted-origin.com") return;

    switch (event.data.type) {
      case "IFRAME_READY":
        console.log("Iframe is ready");
        break;
      case "DATA_UPDATE":
        console.log("Received data update:", event.data.data);
        break;
    }
  },
};

// Iframe code
const iframeWindow = {
  init() {
    // Notify parent that iframe is ready
    this.sendToParent({
      type: "IFRAME_READY",
      data: { status: "ready" },
    });

    // Listen for parent messages
    window.addEventListener("message", this.handleMessage.bind(this));
  },

  sendToParent(message) {
    window.parent.postMessage(message, "*");
  },

  handleMessage(event) {
    // In a real application, you should verify the origin
    // if (event.origin !== "https://parent-origin.com") return;

    switch (event.data.type) {
      case "INIT":
        console.log("Received init config:", event.data.data);
        break;
      case "UPDATE_REQUEST":
        this.sendToParent({
          type: "DATA_UPDATE",
          data: { value: "updated-data" },
        });
        break;
    }
  },
};

// Initialize the appropriate window context
if (isParent) {
  parentWindow.init();
} else {
  iframeWindow.init();
}
