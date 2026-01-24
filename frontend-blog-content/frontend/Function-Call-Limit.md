# Function Call Limit (Rate Limiting) in JavaScript

## Overview
Function call limiting (rate limiting) is a technique to restrict how many times a function can be called within a specified time period. This is essential for preventing abuse, managing API rate limits, controlling resource usage, and protecting against excessive function invocations.

## Basic Implementation

```javascript
/**
 * Implement a function rateLimit which takes a function, a limit, and a time.
 * The function should be called no more than limit times in time milliseconds.
 */
function funcCallLimit(func, limit, time) {
  let calls = [];

  return function (...args) {
    const now = Date.now();

    // Remove timestamps older than `time` ms
    calls = calls.filter((timestamp) => now - timestamp < time);

    if (calls.length < limit) {
      calls.push(now);
      func.apply(this, args);
    }
    // Else: silently ignore the call
  };
}

// Usage
const funcCall = funcCallLimit(console.log, 3, 1000); // 3 calls per 1 second

funcCall("Hello");
funcCall("World");
funcCall("!");
funcCall("not called"); // This call is ignored
```

## Advanced Implementation with Return Value

```javascript
function rateLimit(func, limit, time) {
  let calls = [];

  return function (...args) {
    const now = Date.now();
    
    // Remove old timestamps
    calls = calls.filter((timestamp) => now - timestamp < time);

    if (calls.length < limit) {
      calls.push(now);
      return func.apply(this, args);
    }
    
    // Return error or throw when limit exceeded
    throw new Error('Rate limit exceeded');
  };
}
```

## Implementation with Queue

```javascript
function rateLimitWithQueue(func, limit, time) {
  let calls = [];
  let queue = [];

  function processQueue() {
    const now = Date.now();
    calls = calls.filter((timestamp) => now - timestamp < time);

    while (queue.length > 0 && calls.length < limit) {
      const { args, resolve, reject } = queue.shift();
      calls.push(Date.now());
      
      try {
        const result = func.apply(this, args);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      queue.push({ args, resolve, reject });
      processQueue();
      
      // Process queue periodically
      if (queue.length > 0) {
        setTimeout(processQueue, time / limit);
      }
    });
  };
}
```

## Sliding Window Rate Limiter

```javascript
class SlidingWindowRateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.calls = [];
  }

  canCall() {
    const now = Date.now();
    
    // Remove calls outside the window
    this.calls = this.calls.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (this.calls.length < this.limit) {
      this.calls.push(now);
      return true;
    }

    return false;
  }

  getTimeUntilNextCall() {
    if (this.calls.length < this.limit) {
      return 0;
    }

    const oldestCall = this.calls[0];
    const timeSinceOldest = Date.now() - oldestCall;
    return Math.max(0, this.windowMs - timeSinceOldest);
  }
}

function rateLimit(func, limit, time) {
  const limiter = new SlidingWindowRateLimiter(limit, time);

  return function (...args) {
    if (limiter.canCall()) {
      return func.apply(this, args);
    } else {
      const waitTime = limiter.getTimeUntilNextCall();
      throw new Error(`Rate limit exceeded. Try again in ${waitTime}ms`);
    }
  };
}
```

## Token Bucket Algorithm

```javascript
class TokenBucket {
  constructor(capacity, refillRate, refillPeriod) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate;
    this.refillPeriod = refillPeriod;
    this.lastRefill = Date.now();
  }

  consume(tokens = 1) {
    this.refill();
    
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    
    return false;
  }

  refill() {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd = Math.floor(
      (timePassed / this.refillPeriod) * this.refillRate
    );

    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }

  getTimeUntilNextToken() {
    this.refill();
    
    if (this.tokens >= 1) {
      return 0;
    }

    const tokensNeeded = 1 - this.tokens;
    return Math.ceil((tokensNeeded / this.refillRate) * this.refillPeriod);
  }
}

function rateLimitWithTokenBucket(func, limit, time) {
  const bucket = new TokenBucket(limit, limit, time);

  return function (...args) {
    if (bucket.consume()) {
      return func.apply(this, args);
    } else {
      const waitTime = bucket.getTimeUntilNextToken();
      throw new Error(`Rate limit exceeded. Try again in ${waitTime}ms`);
    }
  };
}
```

## Use Cases

### 1. API Rate Limiting
```javascript
const apiCall = rateLimit(
  async (url) => {
    const response = await fetch(url);
    return response.json();
  },
  10, // 10 calls
  60000 // per minute
);

// Usage
try {
  const data = await apiCall('/api/data');
} catch (error) {
  console.error('Rate limit exceeded');
}
```

### 2. Button Click Throttling
```javascript
const handleClick = rateLimit(
  () => {
    console.log('Button clicked');
    // Perform action
  },
  1, // 1 click
  1000 // per second
);

button.addEventListener('click', handleClick);
```

### 3. Search Input Debouncing with Rate Limit
```javascript
function debounceWithRateLimit(func, debounceMs, limit, limitWindowMs) {
  let timeoutId;
  const rateLimited = rateLimit(func, limit, limitWindowMs);

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      try {
        rateLimited.apply(this, args);
      } catch (error) {
        console.error('Rate limit exceeded');
      }
    }, debounceMs);
  };
}
```

### 4. File Upload Rate Limiting
```javascript
const uploadFile = rateLimit(
  async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  },
  5, // 5 uploads
  60000 // per minute
);
```

## Advanced: Per-User Rate Limiting

```javascript
class PerUserRateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.users = new Map();
  }

  canCall(userId) {
    const now = Date.now();
    
    if (!this.users.has(userId)) {
      this.users.set(userId, []);
    }

    const calls = this.users.get(userId);
    const validCalls = calls.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (validCalls.length < this.limit) {
      validCalls.push(now);
      this.users.set(userId, validCalls);
      return true;
    }

    return false;
  }

  reset(userId) {
    this.users.delete(userId);
  }
}

function rateLimitPerUser(func, limit, time) {
  const limiter = new PerUserRateLimiter(limit, time);

  return function (userId, ...args) {
    if (limiter.canCall(userId)) {
      return func.apply(this, args);
    } else {
      throw new Error('Rate limit exceeded for user');
    }
  };
}
```

## Best Practices

1. **Choose Appropriate Limits**: Balance between too restrictive and too permissive
2. **Handle Errors Gracefully**: Provide clear error messages when limits are exceeded
3. **Consider Different Strategies**: Sliding window vs token bucket based on use case
4. **Monitor Usage**: Track rate limit hits for optimization
5. **Provide Feedback**: Inform users when they hit rate limits
6. **Clean Up**: Remove old timestamps to prevent memory leaks
7. **Per-User Limits**: Consider per-user limits for multi-user systems

## Comparison of Algorithms

### Fixed Window
- Simple to implement
- Can allow bursts at window boundaries
- Less accurate

### Sliding Window
- More accurate
- Prevents bursts
- Slightly more complex

### Token Bucket
- Allows bursts up to capacity
- Smooth refill rate
- More complex implementation

## Real-World Example

```javascript
class RateLimiter {
  constructor(options = {}) {
    this.limit = options.limit || 10;
    this.windowMs = options.windowMs || 60000;
    this.strategy = options.strategy || 'sliding';
    this.calls = [];
  }

  canCall() {
    const now = Date.now();
    
    if (this.strategy === 'sliding') {
      this.calls = this.calls.filter(
        (timestamp) => now - timestamp < this.windowMs
      );
      
      if (this.calls.length < this.limit) {
        this.calls.push(now);
        return true;
      }
      
      return false;
    }
    
    // Fixed window implementation
    const windowStart = now - this.windowMs;
    const recentCalls = this.calls.filter(
      (timestamp) => timestamp > windowStart
    );
    
    if (recentCalls.length < this.limit) {
      this.calls.push(now);
      return true;
    }
    
    return false;
  }

  getRemainingCalls() {
    const now = Date.now();
    this.calls = this.calls.filter(
      (timestamp) => now - timestamp < this.windowMs
    );
    return Math.max(0, this.limit - this.calls.length);
  }
}

// Usage
const limiter = new RateLimiter({ limit: 5, windowMs: 1000 });
const limitedFunc = (...args) => {
  if (limiter.canCall()) {
    return originalFunc(...args);
  }
  throw new Error('Rate limit exceeded');
};
```
