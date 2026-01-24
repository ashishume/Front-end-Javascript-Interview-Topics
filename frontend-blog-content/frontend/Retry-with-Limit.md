# Retry Function with Limit in JavaScript

## Overview
Retry with limit is a pattern that attempts to execute a function multiple times (up to a specified limit) if it fails. This is essential for handling transient failures, network issues, and unreliable operations. The function will retry until it succeeds or exhausts the retry count.

## Basic Implementation

```javascript
/*
Write a retry "wrapperFn" which takes a function and retryCount.
It will try calling the function till it exhaust retryCount and return error at end if not completed else if successful returns the result
*/

function asyncFn() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej("Failed");
    }, 2000);
    setTimeout(() => {
      res("accepted");
    }, 3000);
  });
}

// Implement this function
async function wrapperFn(callback, retryCount) {
  let attempts = 0;
  while (attempts < retryCount) {
    try {
      return await callback();
    } catch (e) {
      attempts++;
      if (attempts >= retryCount) {
        throw new Error(e);
      }
    }
  }
}

wrapperFn(asyncFn, 3)
  .then((res) => console.log(res))
  .catch((error) => console.error("Final Error:", error));
```

## Advanced Implementation with Exponential Backoff

```javascript
async function retryWithBackoff(fn, retryCount, options = {}) {
  const {
    initialDelay = 1000,
    maxDelay = 30000,
    backoffMultiplier = 2,
    onRetry = null
  } = options;

  let lastError;
  
  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt < retryCount - 1) {
        const delay = Math.min(
          initialDelay * Math.pow(backoffMultiplier, attempt),
          maxDelay
        );
        
        if (onRetry) {
          onRetry(attempt + 1, retryCount, error, delay);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}
```

## Implementation with Jitter

```javascript
async function retryWithJitter(fn, retryCount, options = {}) {
  const {
    baseDelay = 1000,
    maxDelay = 30000,
    jitter = true
  } = options;

  let lastError;
  
  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt < retryCount - 1) {
        let delay = Math.min(
          baseDelay * Math.pow(2, attempt),
          maxDelay
        );
        
        // Add jitter to prevent thundering herd
        if (jitter) {
          delay = delay + Math.random() * delay * 0.1;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}
```

## Class-Based Implementation

```javascript
class RetryHandler {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.initialDelay = options.initialDelay || 1000;
    this.maxDelay = options.maxDelay || 30000;
    this.backoffMultiplier = options.backoffMultiplier || 2;
    this.onRetry = options.onRetry || null;
    this.shouldRetry = options.shouldRetry || (() => true);
  }

  async execute(fn) {
    let lastError;
    
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (attempt < this.maxRetries - 1 && this.shouldRetry(error)) {
          const delay = this.calculateDelay(attempt);
          
          if (this.onRetry) {
            this.onRetry(attempt + 1, this.maxRetries, error, delay);
          }
          
          await this.wait(delay);
        }
      }
    }
    
    throw lastError;
  }

  calculateDelay(attempt) {
    return Math.min(
      this.initialDelay * Math.pow(this.backoffMultiplier, attempt),
      this.maxDelay
    );
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Use Cases

### 1. API Calls with Retry
```javascript
async function fetchWithRetry(url, retryCount = 3) {
  return retryWithBackoff(
    async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    },
    retryCount,
    {
      initialDelay: 1000,
      onRetry: (attempt, total, error) => {
        console.log(`Retry ${attempt}/${total} after error: ${error.message}`);
      }
    }
  );
}
```

### 2. Database Operations
```javascript
async function queryWithRetry(query, retryCount = 3) {
  return retryWithBackoff(
    () => db.query(query),
    retryCount,
    {
      shouldRetry: (error) => {
        // Only retry on connection errors, not on query errors
        return error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT';
      }
    }
  );
}
```

### 3. File Operations
```javascript
async function readFileWithRetry(filePath, retryCount = 5) {
  return retryWithBackoff(
    () => fs.promises.readFile(filePath, 'utf8'),
    retryCount,
    {
      initialDelay: 500,
      onRetry: (attempt) => {
        console.log(`Retrying file read (attempt ${attempt})`);
      }
    }
  );
}
```

## Conditional Retry

```javascript
async function retryConditional(fn, retryCount, shouldRetry) {
  let lastError;
  
  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt < retryCount - 1 && shouldRetry(error, attempt)) {
        const delay = 1000 * (attempt + 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
  
  throw lastError;
}

// Usage - only retry on specific errors
await retryConditional(
  fetchData,
  3,
  (error, attempt) => {
    // Only retry on network errors, not on 404
    return error.message.includes('network') || error.code === 'ETIMEDOUT';
  }
);
```

## Retry with Timeout

```javascript
async function retryWithTimeout(fn, retryCount, timeout) {
  let lastError;
  
  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      return await Promise.race([
        fn(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeout)
        )
      ]);
    } catch (error) {
      lastError = error;
      
      if (attempt < retryCount - 1 && error.message !== 'Timeout') {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  
  throw lastError;
}
```

## Retry with Circuit Breaker

```javascript
class RetryWithCircuitBreaker {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.failures = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }

  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await this.retry(fn);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  async retry(fn) {
    let lastError;
    
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (attempt < this.maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      }
    }
    
    throw lastError;
  }

  onSuccess() {
    this.failures = 0;
    if (this.state === 'HALF_OPEN') {
      this.state = 'CLOSED';
    }
  }

  onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}
```

## Best Practices

1. **Use Exponential Backoff**: Prevents overwhelming the server
2. **Add Jitter**: Prevents thundering herd problem
3. **Set Maximum Retries**: Avoid infinite retry loops
4. **Conditional Retry**: Only retry on retryable errors
5. **Log Retries**: Track retry attempts for debugging
6. **Set Timeouts**: Prevent hanging operations
7. **Handle Final Errors**: Always handle the final error after all retries

## Common Patterns

### Pattern 1: Simple Retry
```javascript
async function simpleRetry(fn, count = 3) {
  for (let i = 0; i < count; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === count - 1) throw error;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}
```

### Pattern 2: Retry with Validation
```javascript
async function retryWithValidation(fn, validator, count = 3) {
  for (let i = 0; i < count; i++) {
    try {
      const result = await fn();
      if (validator(result)) {
        return result;
      }
      throw new Error('Validation failed');
    } catch (error) {
      if (i === count - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

### Pattern 3: Retry with Progress
```javascript
async function retryWithProgress(fn, count = 3, onProgress) {
  for (let i = 0; i < count; i++) {
    try {
      return await fn();
    } catch (error) {
      if (onProgress) {
        onProgress(i + 1, count, error);
      }
      if (i === count - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```
