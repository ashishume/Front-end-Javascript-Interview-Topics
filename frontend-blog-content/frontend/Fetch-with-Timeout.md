# Fetch with Timeout in JavaScript

## Overview
Fetch with timeout is a technique to abort HTTP requests that take longer than a specified duration. This prevents hanging requests and provides better user experience by failing fast when network conditions are poor.

## Basic Implementation

```javascript
/**
 * Fetch with timeout - if API doesn't respond within the given duration,
 * fetching will get aborted with error
 * @param {string} url - The URL to fetch
 * @param {number} duration - Timeout duration in milliseconds
 * @returns {Promise} - Promise that resolves with response or rejects on timeout
 */
const fetchWithTimeout = (url, duration) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const { signal } = controller;
    let timerId = null;

    fetch(url, { signal })
      .then((resp) => {
        resp
          .json()
          .then((e) => {
            clearTimeout(timerId);
            resolve(e);
          })
          .catch((error) => {
            clearTimeout(timerId);
            reject(error);
          });
      })
      .catch((error) => {
        clearTimeout(timerId);
        if (error.name === 'AbortError') {
          reject(new Error('Request timeout'));
        } else {
          reject(error);
        }
      });

    timerId = setTimeout(() => {
      console.log("aborted");
      controller.abort();
    }, duration);
  });
};

// Usage
fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 200)
  .then((resp) => {
    console.log(resp);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Improved Implementation

```javascript
async function fetchWithTimeout(url, options = {}) {
  const { timeout = 5000, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    
    throw error;
  }
}
```

## Usage Examples

### Basic Usage
```javascript
try {
  const response = await fetchWithTimeout('/api/data', { timeout: 3000 });
  const data = await response.json();
  console.log(data);
} catch (error) {
  if (error.message.includes('timeout')) {
    console.error('Request took too long');
  } else {
    console.error('Request failed:', error);
  }
}
```

### With Custom Headers
```javascript
const response = await fetchWithTimeout('/api/users', {
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  }
});
```

### With POST Request
```javascript
const response = await fetchWithTimeout('/api/users', {
  method: 'POST',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
});
```

## Advanced: Retry with Timeout

```javascript
async function fetchWithTimeoutAndRetry(url, options = {}) {
  const { timeout = 5000, retries = 3, ...fetchOptions } = options;
  
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchWithTimeout(url, { timeout, ...fetchOptions });
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }
}
```

## Advanced: Race Condition with Promise.race

```javascript
function fetchWithTimeoutRace(url, timeout = 5000) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeout);
  });
  
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Usage
fetchWithTimeoutRace('/api/data', 3000)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## Class-Based Implementation

```javascript
class FetchWithTimeout {
  constructor(defaultTimeout = 5000) {
    this.defaultTimeout = defaultTimeout;
  }
  
  async fetch(url, options = {}) {
    const timeout = options.timeout || this.defaultTimeout;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      
      throw error;
    }
  }
  
  async get(url, timeout) {
    return this.fetch(url, { method: 'GET', timeout });
  }
  
  async post(url, data, timeout) {
    return this.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      timeout
    });
  }
}

// Usage
const fetcher = new FetchWithTimeout(3000);
const response = await fetcher.get('/api/data');
```

## Handling Different Response Types

```javascript
async function fetchWithTimeout(url, timeout = 5000, responseType = 'json') {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    switch (responseType) {
      case 'json':
        return await response.json();
      case 'text':
        return await response.text();
      case 'blob':
        return await response.blob();
      case 'arrayBuffer':
        return await response.arrayBuffer();
      default:
        return response;
    }
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
```

## Use Cases

1. **API Calls**: Prevent hanging API requests
2. **Slow Networks**: Fail fast on slow connections
3. **User Experience**: Provide immediate feedback
4. **Resource Management**: Free up resources quickly
5. **Error Handling**: Distinguish timeout errors from other errors

## Best Practices

1. **Set Reasonable Timeouts**: Balance between too short (false failures) and too long (poor UX)
2. **Handle AbortError**: Always check for AbortError specifically
3. **Clean Up Timers**: Always clear timeouts to prevent memory leaks
4. **Provide Fallbacks**: Show user-friendly messages on timeout
5. **Log Timeouts**: Track timeout occurrences for monitoring
6. **Retry Logic**: Consider implementing retry for transient failures

## Error Handling

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
  try {
    const response = await fetchWithTimeout(url, timeout);
    return await response.json();
  } catch (error) {
    if (error.message.includes('timeout')) {
      // Handle timeout specifically
      console.error('Request timed out');
      // Show user-friendly message
      // Retry or show fallback UI
    } else if (error.name === 'AbortError') {
      console.error('Request was aborted');
    } else {
      // Handle other errors
      console.error('Request failed:', error);
    }
    throw error;
  }
}
```

## Browser Compatibility

- AbortController is supported in all modern browsers
- For older browsers, use a polyfill or the Promise.race approach
- Check caniuse.com for specific browser support
