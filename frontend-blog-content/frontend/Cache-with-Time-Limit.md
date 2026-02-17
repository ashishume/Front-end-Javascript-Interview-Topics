# Cache with Time Limit in JavaScript

## Overview
A time-limited cache is a caching mechanism where stored values automatically expire after a specified duration. This is useful for storing temporary data, API responses, computed values, and any data that has a limited validity period.

## Basic Implementation

```javascript
var TimeLimitedCache = function () {
  this.cache = new Map();
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  const exists = this.cache.has(key) && this.cache.get(key).expiry > Date.now();
  this.cache.set(key, {
    value,
    expiry: Date.now() + duration,
  });

  return exists;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;
  const { value, expiry } = this.cache.get(key);
  if (expiry > Date.now()) {
    return value;
  }
  this.cache.delete(key);
  return -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  let count = 0;
  for (let [key, { value, expiry }] of this.cache.entries()) {
    if (expiry > Date.now()) {
      count += 1;
    } else {
      this.cache.delete(key);
    }
  }

  return count;
};

// Usage
const timeLimitedCache = new TimeLimitedCache();
timeLimitedCache.set(1, 42, 1000);
timeLimitedCache.set(2, 40, 1000);
timeLimitedCache.set(3, 30, 1000);
console.log(timeLimitedCache.get(1)); // 42
console.log(timeLimitedCache.get(2)); // 40
console.log(timeLimitedCache.get(3)); // 30
console.log(timeLimitedCache.count()); // 3
```

## Class-Based Implementation

```javascript
class TimeLimitedCache {
  constructor() {
    this.cache = new Map();
    this.cleanupInterval = null;
  }

  set(key, value, duration) {
    const exists = this.has(key);
    const expiry = Date.now() + duration;
    
    this.cache.set(key, { value, expiry });
    
    // Start cleanup if not already running
    if (!this.cleanupInterval) {
      this.startCleanup();
    }
    
    return exists;
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return -1;
    }
    
    if (item.expiry > Date.now()) {
      return item.value;
    }
    
    // Expired, remove it
    this.cache.delete(key);
    return -1;
  }

  has(key) {
    const item = this.cache.get(key);
    if (!item) return false;
    
    if (item.expiry > Date.now()) {
      return true;
    }
    
    this.cache.delete(key);
    return false;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
    this.stopCleanup();
  }

  count() {
    let count = 0;
    const now = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry > now) {
        count++;
      } else {
        this.cache.delete(key);
      }
    }
    
    return count;
  }

  startCleanup() {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000); // Clean every minute
  }

  stopCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry <= now) {
        this.cache.delete(key);
      }
    }
    
    // Stop cleanup if cache is empty
    if (this.cache.size === 0) {
      this.stopCleanup();
    }
  }

  getAll() {
    const result = {};
    const now = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry > now) {
        result[key] = item.value;
      } else {
        this.cache.delete(key);
      }
    }
    
    return result;
  }
}
```

## Advanced Features

### 1. Cache with Callbacks
```javascript
class TimeLimitedCacheWithCallbacks extends TimeLimitedCache {
  constructor(options = {}) {
    super();
    this.onExpire = options.onExpire || null;
    this.onSet = options.onSet || null;
  }

  set(key, value, duration) {
    const existed = super.set(key, value, duration);
    
    if (this.onSet) {
      this.onSet(key, value, duration, existed);
    }
    
    // Schedule expiration callback
    if (this.onExpire) {
      setTimeout(() => {
        if (this.get(key) === -1) {
          this.onExpire(key, value);
        }
      }, duration);
    }
    
    return existed;
  }
}
```

### 2. Cache with Statistics
```javascript
class TimeLimitedCacheWithStats extends TimeLimitedCache {
  constructor() {
    super();
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      expires: 0
    };
  }

  get(key) {
    const result = super.get(key);
    
    if (result === -1) {
      this.stats.misses++;
    } else {
      this.stats.hits++;
    }
    
    return result;
  }

  set(key, value, duration) {
    const existed = super.set(key, value, duration);
    this.stats.sets++;
    
    if (!existed) {
      // Track expiration
      setTimeout(() => {
        this.stats.expires++;
      }, duration);
    }
    
    return existed;
  }

  getStats() {
    return {
      ...this.stats,
      hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0,
      size: this.count()
    };
  }
}
```

### 3. Cache with Size Limit
```javascript
class TimeLimitedCacheWithSizeLimit extends TimeLimitedCache {
  constructor(maxSize = 100) {
    super();
    this.maxSize = maxSize;
    this.accessOrder = new Map(); // For LRU eviction
  }

  set(key, value, duration) {
    // Evict if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }
    
    this.accessOrder.set(key, Date.now());
    return super.set(key, value, duration);
  }

  get(key) {
    const result = super.get(key);
    
    if (result !== -1) {
      this.accessOrder.set(key, Date.now());
    }
    
    return result;
  }

  evictLRU() {
    let oldestKey = null;
    let oldestTime = Infinity;
    
    for (const [key, time] of this.accessOrder.entries()) {
      if (time < oldestTime && this.cache.has(key)) {
        oldestTime = time;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.accessOrder.delete(oldestKey);
    }
  }
}
```

## Use Cases

### 1. API Response Caching
```javascript
const apiCache = new TimeLimitedCache();

async function fetchWithCache(url) {
  // Check cache first
  const cached = apiCache.get(url);
  if (cached !== -1) {
    return cached;
  }
  
  // Fetch and cache
  const response = await fetch(url).then(r => r.json());
  apiCache.set(url, response, 60000); // Cache for 1 minute
  return response;
}
```

### 2. Expensive Computation Caching
```javascript
const computationCache = new TimeLimitedCache();

function expensiveComputation(input) {
  const cached = computationCache.get(input);
  if (cached !== -1) {
    return cached;
  }
  
  const result = performExpensiveOperation(input);
  computationCache.set(input, result, 300000); // Cache for 5 minutes
  return result;
}
```

### 3. Session Data
```javascript
const sessionCache = new TimeLimitedCache();

function setSessionData(userId, data) {
  sessionCache.set(userId, data, 3600000); // 1 hour
}

function getSessionData(userId) {
  return sessionCache.get(userId);
}
```

## Best Practices

1. **Automatic Cleanup**: Implement periodic cleanup to remove expired entries
2. **Memory Management**: Limit cache size to prevent memory issues
3. **Error Handling**: Handle cases where cache operations fail
4. **Statistics**: Track cache performance (hits, misses, etc.)
5. **Expiration Callbacks**: Use callbacks to handle expired entries
6. **Thread Safety**: Consider concurrency if used in multi-threaded environments

## Performance Considerations

1. **Cleanup Frequency**: Balance cleanup frequency with performance
2. **Map vs Object**: Use Map for better performance with dynamic keys
3. **Lazy Expiration**: Check expiration on access, not proactively
4. **Size Limits**: Implement size limits to prevent memory issues

## Real-World Example

```javascript
class APICache {
  constructor() {
    this.cache = new TimeLimitedCache();
  }

  async get(url, options = {}) {
    const { ttl = 60000, forceRefresh = false } = options;
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    
    if (!forceRefresh) {
      const cached = this.cache.get(cacheKey);
      if (cached !== -1) {
        return cached;
      }
    }
    
    const response = await fetch(url, options).then(r => r.json());
    this.cache.set(cacheKey, response, ttl);
    return response;
  }

  clear() {
    this.cache.clear();
  }

  getStats() {
    return {
      size: this.cache.count(),
      cache: this.cache.getAll()
    };
  }
}

// Usage
const apiCache = new APICache();
const data = await apiCache.get('/api/users', { ttl: 300000 });
```
