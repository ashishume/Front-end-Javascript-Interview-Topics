# Circuit Breaker Pattern in JavaScript

## Overview
The Circuit Breaker pattern is a design pattern used to prevent cascading failures in distributed systems. It acts as a safety mechanism that stops requests to a failing service, allowing it to recover, and prevents the failure from spreading to other parts of the system.

## How It Works

The Circuit Breaker has three states:
1. **Closed**: Normal operation - requests flow through
2. **Open**: Service is failing - requests are blocked immediately
3. **Half-Open**: Testing if service has recovered - allows limited requests

## Basic Implementation

```javascript
const circuitBreaker = (fn, maxAttempts, thresholdTimeLimit) => {
  let failedAttempts = 0;
  let isClosed = false;
  let lastTimeFailure = 0;
  
  return function (...args) {
    if (isClosed) {
      const diff = Date.now() - lastTimeFailure;
      if (diff > thresholdTimeLimit) {
        isClosed = false; // Try again - move to half-open
      } else {
        console.error("Service unavailable");
        return;
      }
    }

    try {
      const result = fn(...args);
      failedAttempts = 0; // Reset on success
      return result;
    } catch (e) {
      failedAttempts++;
      lastTimeFailure = Date.now();
      if (failedAttempts >= maxAttempts) {
        isClosed = true; // Open the circuit
      }
      console.error("Error");
      throw e;
    }
  };
};
```

## Example Usage

```javascript
const testFunc = () => {
  let count = 0;
  return () => {
    count++;
    if (count < 4) {
      throw "Failed";
    } else {
      return "passed";
    }
  };
};

const t = testFunc();
const r = circuitBreaker(t, 3, 200);

// First 3 attempts fail - circuit opens
r(); // Error
r(); // Error
r(); // Error

// Circuit is open - request blocked
r(); // "Service unavailable"

// After threshold time, circuit half-opens and allows request
setTimeout(() => {
  console.log(r()); // "passed" - service recovered
}, 300);
```

## Advanced Implementation

```javascript
class CircuitBreaker {
  constructor(fn, options = {}) {
    this.fn = fn;
    this.maxAttempts = options.maxAttempts || 3;
    this.timeout = options.timeout || 5000;
    this.resetTimeout = options.resetTimeout || 10000;
    
    this.failedAttempts = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.lastFailureTime = null;
    this.onStateChange = options.onStateChange || (() => {});
  }
  
  async call(...args) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.setState('HALF_OPEN');
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await this.executeWithTimeout(...args);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  async executeWithTimeout(...args) {
    return Promise.race([
      this.fn(...args),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), this.timeout)
      )
    ]);
  }
  
  onSuccess() {
    this.failedAttempts = 0;
    if (this.state === 'HALF_OPEN') {
      this.setState('CLOSED');
    }
  }
  
  onFailure() {
    this.failedAttempts++;
    this.lastFailureTime = Date.now();
    
    if (this.failedAttempts >= this.maxAttempts) {
      this.setState('OPEN');
    }
  }
  
  setState(newState) {
    if (this.state !== newState) {
      this.state = newState;
      this.onStateChange(newState);
    }
  }
  
  reset() {
    this.failedAttempts = 0;
    this.lastFailureTime = null;
    this.setState('CLOSED');
  }
}
```

## Real-World Example: API Calls

```javascript
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

const breaker = new CircuitBreaker(fetchUserData, {
  maxAttempts: 3,
  timeout: 5000,
  resetTimeout: 30000,
  onStateChange: (state) => {
    console.log(`Circuit breaker state: ${state}`);
  }
});

// Usage
try {
  const user = await breaker.call(123);
  console.log(user);
} catch (error) {
  console.error('Request failed:', error.message);
  // Fallback logic here
}
```

## Use Cases

1. **External API Calls**: Protect against failing third-party services
2. **Database Queries**: Prevent overwhelming a failing database
3. **Microservices**: Isolate failures between services
4. **Network Requests**: Handle network timeouts and failures
5. **Resource-Intensive Operations**: Protect against resource exhaustion

## Benefits

1. **Fault Tolerance**: Prevents cascading failures
2. **Fast Failure**: Fails fast instead of waiting for timeouts
3. **Automatic Recovery**: Automatically tries to recover after timeout
4. **Resource Protection**: Prevents overwhelming failing services
5. **Better User Experience**: Provides immediate feedback

## Best Practices

1. **Set Appropriate Thresholds**: Balance between too sensitive and too lenient
2. **Monitor Circuit State**: Log state changes for debugging
3. **Implement Fallbacks**: Provide alternative behavior when circuit is open
4. **Use Timeouts**: Prevent hanging requests
5. **Reset Strategy**: Allow circuit to recover after appropriate time
6. **Metrics**: Track circuit state changes and failure rates

## Integration with Retry Logic

```javascript
async function fetchWithRetryAndCircuitBreaker(url, retries = 3) {
  const breaker = new CircuitBreaker(fetch, {
    maxAttempts: 5,
    timeout: 5000,
    resetTimeout: 30000
  });
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await breaker.call(url);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

## State Management

```javascript
// Track circuit breaker metrics
class CircuitBreakerMetrics {
  constructor() {
    this.successCount = 0;
    this.failureCount = 0;
    this.stateChanges = [];
  }
  
  recordSuccess() {
    this.successCount++;
  }
  
  recordFailure() {
    this.failureCount++;
  }
  
  recordStateChange(state) {
    this.stateChanges.push({
      state,
      timestamp: Date.now()
    });
  }
  
  getStats() {
    return {
      successCount: this.successCount,
      failureCount: this.failureCount,
      successRate: this.successCount / (this.successCount + this.failureCount),
      stateChanges: this.stateChanges
    };
  }
}
```
