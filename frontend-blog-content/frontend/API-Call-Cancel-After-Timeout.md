# API Call Cancel After Timeout in JavaScript

## Overview
Canceling API calls after a certain timeout is a technique to abort HTTP requests that exceed a specified time limit. This prevents hanging requests, improves user experience, and helps manage resources efficiently by ensuring requests don't run indefinitely.

## Basic Implementation

```javascript
/** Cancel API call after timeout */
async function fetchDataWithTimeout(url, timeout) {
  const controller = new AbortController();
  const { signal } = controller;

  // Setup a timeout to abort the request after the specified time
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId); // Clear the timeout if the request succeeds
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request timed out"); // Handle timeout error
    } else {
      console.error("Error fetching data:", error); // Handle other errors
    }
  }
}

// Example usage:
const apiUrl = "https://jsonplaceholder.typicode.com/posts";
const timeoutInSeconds = 1; // Timeout in seconds

fetchDataWithTimeout(apiUrl, timeoutInSeconds * 1000).then((res) => {
  // Convert to milliseconds
  console.log(res);
});
```

## Enhanced Implementation

### With Retry Logic
```javascript
async function fetchWithTimeoutAndRetry(url, timeout, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fetchDataWithTimeout(url, timeout);
    } catch (error) {
      if (error.name === "AbortError" && attempt < maxRetries - 1) {
        console.log(`Attempt ${attempt + 1} timed out, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }
}
```

### With Progress Tracking
```javascript
async function fetchWithTimeoutAndProgress(url, timeout, onProgress) {
  const controller = new AbortController();
  const { signal } = controller;
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    let receivedLength = 0;
    const chunks = [];
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      chunks.push(value);
      receivedLength += value.length;
      
      if (onProgress) {
        onProgress(receivedLength, contentLength);
      }
    }
    
    const allChunks = new Uint8Array(receivedLength);
    let position = 0;
    for (const chunk of chunks) {
      allChunks.set(chunk, position);
      position += chunk.length;
    }
    
    return JSON.parse(new TextDecoder().decode(allChunks));
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  }
}
```

## Use Cases

### 1. API Requests with Timeout
```javascript
const userData = await fetchDataWithTimeout("/api/user", 5000);
```

### 2. File Upload with Timeout
```javascript
async function uploadFileWithTimeout(file, url, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  const formData = new FormData();
  formData.append("file", file);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Upload timeout");
    }
    throw error;
  }
}
```

## Best Practices

1. **Always Clear Timeout**: Clear timeout on success
2. **Handle AbortError**: Distinguish timeout from other errors
3. **Provide Feedback**: Inform users about timeouts
4. **Set Reasonable Timeouts**: Balance between too short and too long
5. **Clean Up Resources**: Always clean up timers and controllers
