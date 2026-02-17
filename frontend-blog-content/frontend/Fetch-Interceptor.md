# Fetch Request and Response Interceptor in JavaScript

## Overview
Fetch interceptors allow you to intercept and modify HTTP requests and responses globally. This is useful for adding authentication tokens, logging, error handling, request/response transformation, and implementing cross-cutting concerns like retry logic or caching.

## Basic Implementation

```javascript
/**
 * Create custom fetch request and response interceptor
 */

const originalFetch = window.fetch;

/** Global var for interceptor requests */
window.requestInterceptor = (args) => {
    console.log('Request intercepted:', args);
    return args;
};

/** Global var for interceptor responses */
window.responseInterceptor = (response) => {
  console.log('Response intercepted:', response);
  return response;
};

window.fetch = async (...args) => {
  args = requestInterceptor(args);
  let response = await originalFetch(...args);
  response = responseInterceptor(response);
  return response;
};

// Usage
fetch("https://jsonplaceholder.typicode.com/todos/")
  .then((res) => res.json())
  .then((json) => console.log(json));
```

## Advanced Implementation

```javascript
class FetchInterceptor {
  constructor() {
    this.originalFetch = window.fetch;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.errorInterceptors = [];
    
    this.setup();
  }

  setup() {
    const self = this;
    
    window.fetch = async function(...args) {
      try {
        // Apply request interceptors
        let modifiedArgs = args;
        for (const interceptor of self.requestInterceptors) {
          modifiedArgs = await interceptor(modifiedArgs);
        }

        // Make the actual request
        let response = await self.originalFetch(...modifiedArgs);

        // Apply response interceptors
        for (const interceptor of self.responseInterceptors) {
          response = await interceptor(response);
        }

        return response;
      } catch (error) {
        // Apply error interceptors
        for (const interceptor of self.errorInterceptors) {
          error = await interceptor(error);
        }
        throw error;
      }
    };
  }

  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
    return () => {
      this.requestInterceptors = this.requestInterceptors.filter(i => i !== interceptor);
    };
  }

  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
    return () => {
      this.responseInterceptors = this.responseInterceptors.filter(i => i !== interceptor);
    };
  }

  addErrorInterceptor(interceptor) {
    this.errorInterceptors.push(interceptor);
    return () => {
      this.errorInterceptors = this.errorInterceptors.filter(i => i !== interceptor);
    };
  }

  removeAllInterceptors() {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.errorInterceptors = [];
  }
}
```

## Common Use Cases

### 1. Adding Authentication Headers

```javascript
const interceptor = new FetchInterceptor();

interceptor.addRequestInterceptor(async (args) => {
  const [url, options = {}] = args;
  const token = localStorage.getItem('authToken');
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  return [url, { ...options, headers }];
});

// All fetch calls now include auth token
fetch('/api/users');
```

### 2. Request Logging

```javascript
interceptor.addRequestInterceptor(async (args) => {
  const [url, options] = args;
  console.log(`[Request] ${options?.method || 'GET'} ${url}`, {
    headers: options?.headers,
    body: options?.body
  });
  return args;
});

interceptor.addResponseInterceptor(async (response) => {
  console.log(`[Response] ${response.status} ${response.url}`);
  return response;
});
```

### 3. Error Handling

```javascript
interceptor.addErrorInterceptor(async (error) => {
  console.error('Fetch error:', error);
  
  // Show user-friendly error message
  if (error.message.includes('Failed to fetch')) {
    showNotification('Network error. Please check your connection.');
  }
  
  return error;
});

interceptor.addResponseInterceptor(async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }
  return response;
});
```

### 4. Request Retry Logic

```javascript
interceptor.addResponseInterceptor(async (response) => {
  if (response.status === 429 || response.status >= 500) {
    // Retry logic
    const maxRetries = 3;
    for (let i = 0; i < maxRetries; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      const retryResponse = await fetch(response.url, {
        method: response.url.includes('?') ? 'GET' : 'POST'
      });
      if (retryResponse.ok) {
        return retryResponse;
      }
    }
  }
  return response;
});
```

### 5. Response Transformation

```javascript
interceptor.addResponseInterceptor(async (response) => {
  const clonedResponse = response.clone();
  const data = await clonedResponse.json();
  
  // Transform response data
  if (Array.isArray(data)) {
    return new Response(JSON.stringify(data.map(transformItem)), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }
  
  return response;
});
```

### 6. Request/Response Caching

```javascript
const cache = new Map();

interceptor.addRequestInterceptor(async (args) => {
  const [url, options] = args;
  
  // Only cache GET requests
  if (options?.method === 'GET' || !options?.method) {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < 60000) { // 1 minute cache
        return new Promise(resolve => {
          resolve(new Response(JSON.stringify(cached.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        });
      }
    }
  }
  
  return args;
});

interceptor.addResponseInterceptor(async (response) => {
  const url = response.url;
  const clonedResponse = response.clone();
  const data = await clonedResponse.json();
  
  // Cache the response
  if (response.ok) {
    const cacheKey = url;
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }
  
  return response;
});
```

### 7. Adding Request ID

```javascript
interceptor.addRequestInterceptor(async (args) => {
  const [url, options = {}] = args;
  const requestId = `req-${Date.now()}-${Math.random()}`;
  
  const headers = new Headers(options.headers);
  headers.set('X-Request-ID', requestId);
  
  return [url, { ...options, headers }];
});
```

### 8. Request Timing

```javascript
const requestTimings = new Map();

interceptor.addRequestInterceptor(async (args) => {
  const [url] = args;
  requestTimings.set(url, Date.now());
  return args;
});

interceptor.addResponseInterceptor(async (response) => {
  const startTime = requestTimings.get(response.url);
  if (startTime) {
    const duration = Date.now() - startTime;
    console.log(`Request to ${response.url} took ${duration}ms`);
    requestTimings.delete(response.url);
  }
  return response;
});
```

## Complete Example: API Client with Interceptors

```javascript
class APIClient {
  constructor() {
    this.interceptor = new FetchInterceptor();
    this.setupInterceptors();
  }

  setupInterceptors() {
    // Auth interceptor
    this.interceptor.addRequestInterceptor(async (args) => {
      const [url, options = {}] = args;
      const token = this.getAuthToken();
      
      if (token) {
        const headers = new Headers(options.headers);
        headers.set('Authorization', `Bearer ${token}`);
        return [url, { ...options, headers }];
      }
      
      return args;
    });

    // Error handling
    this.interceptor.addResponseInterceptor(async (response) => {
      if (response.status === 401) {
        // Handle unauthorized
        this.handleUnauthorized();
        throw new Error('Unauthorized');
      }
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${response.status}`);
      }
      
      return response;
    });

    // Logging
    this.interceptor.addRequestInterceptor(async (args) => {
      console.log('[API Request]', args[0]);
      return args;
    });
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  handleUnauthorized() {
    // Redirect to login
    window.location.href = '/login';
  }

  async get(url) {
    const response = await fetch(url);
    return response.json();
  }

  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// Usage
const api = new APIClient();
api.get('/api/users');
```

## Best Practices

1. **Preserve Original Fetch**: Always store the original fetch function
2. **Handle Errors**: Implement proper error handling in interceptors
3. **Clone Responses**: Clone responses before reading to avoid consuming the stream
4. **Async Support**: Make interceptors async to support async operations
5. **Remove Interceptors**: Provide a way to remove interceptors when not needed
6. **Order Matters**: Apply interceptors in the correct order
7. **Test Thoroughly**: Test interceptors with various scenarios

## Limitations

1. **Global Modification**: Modifies global fetch - affects all fetch calls
2. **Order Dependency**: Interceptor order can affect behavior
3. **Error Propagation**: Errors in interceptors can break the chain
4. **Performance**: Multiple interceptors add overhead
