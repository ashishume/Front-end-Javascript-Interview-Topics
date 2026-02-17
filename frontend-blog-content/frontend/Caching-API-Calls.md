# Caching API Calls in JavaScript

## Overview
Caching API calls is a technique to store API responses temporarily to avoid redundant network requests. This improves performance, reduces server load, and provides better user experience by serving cached data when available and valid.

## Basic Implementation

```javascript
/** Caching API call */

let cache = {};

function cacheMethod(url) {
  // Cache the url and check if expiry date is passed or not
  if (cache[url] && cache[url].expiresAt > Date.now()) {
    return Promise.resolve(cache[url].data);
  }

  // If cache is not present then make a new API call
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      // Cache duration
      const cacheDuration = 60 * 1000; // 1 minute
      const expiresAt = Date.now() + cacheDuration;
      const data = res.products;
      // Pass the data to the cache
      cache[url] = { data, expiresAt };

      return data;
    });
}

// Usage
cacheMethod("https://dummyjson.com/products?limit=10").then((d) => {
  console.log("d==>", d);

  // Second call is not made in network tab, only promise is being returned
  cacheMethod("https://dummyjson.com/products?limit=10").then((a) => {
    console.log("a==>", a);
  });
});
```

## Advanced Implementation

### Class-Based API Cache
```javascript
class APICache {
  constructor(options = {}) {
    this.cache = new Map();
    this.defaultTTL = options.defaultTTL || 60000; // 1 minute
    this.maxSize = options.maxSize || 100;
  }

  async get(url, options = {}) {
    const {
      ttl = this.defaultTTL,
      forceRefresh = false,
      key = url
    } = options;

    // Check cache
    if (!forceRefresh && this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (cached.expiresAt > Date.now()) {
        return cached.data;
      }
      // Expired, remove it
      this.cache.delete(key);
    }

    // Fetch and cache
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Store in cache
      this.set(key, data, ttl);
      
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  set(key, data, ttl = this.defaultTTL) {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttl
    });
  }

  has(key) {
    if (!this.cache.has(key)) {
      return false;
    }
    
    const cached = this.cache.get(key);
    if (cached.expiresAt <= Date.now()) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }

  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (value.expiresAt <= now) {
        this.cache.delete(key);
      }
    }
  }
}
```

## Use Cases

### 1. Basic API Caching
```javascript
const apiCache = new APICache({ defaultTTL: 300000 }); // 5 minutes

async function fetchUserData(userId) {
  return apiCache.get(`/api/users/${userId}`);
}
```

### 2. Different TTLs for Different Endpoints
```javascript
async function fetchData(endpoint) {
  const ttlMap = {
    '/api/users': 60000,      // 1 minute
    '/api/posts': 300000,     // 5 minutes
    '/api/settings': 3600000  // 1 hour
  };

  return apiCache.get(endpoint, {
    ttl: ttlMap[endpoint] || 60000
  });
}
```

### 3. Cache with Request Options
```javascript
class AdvancedAPICache extends APICache {
  async get(url, options = {}) {
    const {
      method = 'GET',
      headers = {},
      body = null,
      ...cacheOptions
    } = options;

    // Create cache key from URL and options
    const cacheKey = JSON.stringify({ url, method, headers, body });

    if (!options.forceRefresh && this.has(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    const fetchOptions = { method, headers };
    if (body) {
      fetchOptions.body = JSON.stringify(body);
      fetchOptions.headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    this.set(cacheKey, data, cacheOptions.ttl);

    return data;
  }
}
```

## Advanced Features

### 1. Cache with Stale-While-Revalidate
```javascript
class StaleWhileRevalidateCache extends APICache {
  async get(url, options = {}) {
    const key = options.key || url;
    const cached = this.cache.get(key);

    if (cached) {
      const isStale = cached.expiresAt <= Date.now();
      
      if (!isStale) {
        return cached.data; // Fresh cache
      }

      // Stale but return it, then refresh in background
      this.refreshInBackground(url, key, options);
      return cached.data;
    }

    // No cache, fetch normally
    return this.fetchAndCache(url, key, options);
  }

  async refreshInBackground(url, key, options) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.set(key, data, options.ttl);
    } catch (error) {
      console.error('Background refresh failed:', error);
    }
  }
}
```

### 2. Cache with Invalidation
```javascript
class CacheWithInvalidation extends APICache {
  constructor(options = {}) {
    super(options);
    this.invalidationPatterns = new Map();
  }

  invalidate(pattern) {
    if (typeof pattern === 'string') {
      // Simple string match
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else if (pattern instanceof RegExp) {
      // Regex match
      for (const key of this.cache.keys()) {
        if (pattern.test(key)) {
          this.cache.delete(key);
        }
      }
    } else if (typeof pattern === 'function') {
      // Function predicate
      for (const key of this.cache.keys()) {
        if (pattern(key)) {
          this.cache.delete(key);
        }
      }
    }
  }

  setInvalidationRule(urlPattern, invalidateOn) {
    this.invalidationPatterns.set(urlPattern, invalidateOn);
  }
}
```

### 3. Cache with Statistics
```javascript
class CacheWithStats extends APICache {
  constructor(options = {}) {
    super(options);
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      errors: 0
    };
  }

  async get(url, options = {}) {
    const key = options.key || url;

    if (this.has(key)) {
      this.stats.hits++;
      return this.cache.get(key).data;
    }

    this.stats.misses++;
    
    try {
      const data = await this.fetchAndCache(url, key, options);
      this.stats.sets++;
      return data;
    } catch (error) {
      this.stats.errors++;
      throw error;
    }
  }

  getStats() {
    const total = this.stats.hits + this.stats.misses;
    return {
      ...this.stats,
      hitRate: total > 0 ? (this.stats.hits / total * 100).toFixed(2) + '%' : '0%',
      size: this.cache.size
    };
  }
}
```

## React Hook Example

```javascript
import { useState, useEffect, useRef } from 'react';

function useCachedAPI(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef(new APICache());

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const result = await cacheRef.current.get(url, options);
        
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data, loading, error } = useCachedAPI(`/api/users/${userId}`, {
    ttl: 300000
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.name}</div>;
}
```

## Best Practices

1. **Set Appropriate TTLs**: Balance freshness with performance
2. **Handle Errors**: Don't cache error responses
3. **Cache Key Strategy**: Use consistent cache keys
4. **Memory Management**: Limit cache size and cleanup expired entries
5. **Invalidation**: Provide ways to invalidate cache when needed
6. **Stale-While-Revalidate**: Consider serving stale data while refreshing

## Real-World Example

```javascript
class ProductionAPICache {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 300000; // 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  async get(url, options = {}) {
    const { ttl = this.defaultTTL, forceRefresh = false } = options;
    const key = this.createKey(url, options);

    if (!forceRefresh && this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (cached.expiresAt > Date.now()) {
        return cached.data;
      }
      this.cache.delete(key);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      this.set(key, data, ttl);
      return data;
    } catch (error) {
      // Return stale cache on error if available
      const stale = this.cache.get(key);
      if (stale) {
        console.warn('Using stale cache due to error:', error);
        return stale.data;
      }
      throw error;
    }
  }

  createKey(url, options) {
    return JSON.stringify({ url, ...options });
  }

  set(key, data, ttl) {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttl
    });
  }

  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (value.expiresAt <= now) {
        this.cache.delete(key);
      }
    }
  }

  destroy() {
    clearInterval(this.cleanupInterval);
    this.cache.clear();
  }
}
```
