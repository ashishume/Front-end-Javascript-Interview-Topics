# LRU Cache in JavaScript

LRU (Least Recently Used) Cache is a caching strategy that evicts the least recently used items when the cache reaches its maximum capacity. It's one of the most common cache eviction policies and is widely used in computer systems, databases, and web applications for efficient memory management.

## What is LRU Cache?

An LRU Cache maintains a fixed-size cache and removes the item that hasn't been accessed for the longest time when the cache is full and a new item needs to be added. It's based on the principle that recently used items are more likely to be used again.

## How LRU Cache Works

1. **Access Pattern**: When an item is accessed (get or set), it becomes the "most recently used"
2. **Eviction**: When the cache is full and a new item is added, the "least recently used" item is removed
3. **Ordering**: The cache maintains the order of access, with most recent at one end and least recent at the other

## Basic Implementation

Here's a simple LRU Cache implementation using JavaScript's `Map`:

```javascript
class LRU {
  constructor(max = 5) {
    this.maxSize = max;
    this.map = new Map();
  }

  /**
   * When element is accessed, we delete the old one and add new one
   * to keep that element as the most recently used
   */
  get(key) {
    const item = this.map.get(key);
    if (item) {
      // Remove and re-add to make it most recently used
      this.map.delete(key);
      this.map.set(key, item);
      return item;
    }
    return undefined;
  }

  /**
   * When element is set:
   * - If cache is full, delete the least recently used (first item)
   * - If element already exists, remove it first
   * - Add the new element (becomes most recently used)
   */
  set(key, value) {
    // If cache is full, remove least recently used (first item in Map)
    if (this.map.size === this.maxSize && !this.map.has(key)) {
      this.map.delete(this.first());
    }
    
    // If element already exists, remove it first
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    
    // Add new element (becomes most recently used)
    this.map.set(key, value);
  }

  /**
   * Get the first key (least recently used)
   */
  first() {
    const [firstKey] = this.map.keys();
    return firstKey;
  }

  /**
   * Get cache size
   */
  size() {
    return this.map.size;
  }

  /**
   * Clear the cache
   */
  clear() {
    this.map.clear();
  }

  /**
   * Get all entries (for debugging)
   */
  entries() {
    return Array.from(this.map.entries());
  }
}

// Usage
const lru = new LRU(3);

lru.set("role", "SDE");
lru.set("name", "Ashish");
lru.get("role"); // Access "role", making it most recently used
lru.set("age", "21");
lru.set("loc", "bangalore"); // Cache is full, "name" is evicted

console.log(lru.entries());
// Output: [["role", "SDE"], ["age", "21"], ["loc", "bangalore"]]
```

## How Map Maintains Insertion Order

JavaScript's `Map` maintains insertion order, which makes it perfect for LRU Cache:
- **First item**: Least recently used
- **Last item**: Most recently used
- **Re-insertion**: Moving an item to the end when accessed

## Step-by-Step Example

```javascript
const cache = new LRU(3);

// Step 1: Add items
cache.set("a", 1);
cache.set("b", 2);
cache.set("c", 3);
// Cache: [a, b, c] (a is LRU, c is MRU)

// Step 2: Access "a" - moves to end
cache.get("a");
// Cache: [b, c, a] (b is LRU, a is MRU)

// Step 3: Add new item - "b" is evicted
cache.set("d", 4);
// Cache: [c, a, d] (c is LRU, d is MRU)

// Step 4: Access "c" - moves to end
cache.get("c");
// Cache: [a, d, c] (a is LRU, c is MRU)
```

## Advanced Implementation with O(1) Operations

The above implementation is O(1) for most operations, but we can enhance it with additional features:

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1; // or undefined
    }

    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing key - move to end
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    // Add/update at end (most recently used)
    this.cache.set(key, value);
  }

  // Additional utility methods
  has(key) {
    return this.cache.has(key);
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  get size() {
    return this.cache.size;
  }

  // Get all keys in order (LRU to MRU)
  keys() {
    return Array.from(this.cache.keys());
  }

  // Get all values in order (LRU to MRU)
  values() {
    return Array.from(this.cache.values());
  }
}
```

## Real-World Use Cases

### 1. Browser Cache

```javascript
// Simulate browser caching of resources
const browserCache = new LRUCache(10);

function loadResource(url) {
  // Check cache first
  if (browserCache.has(url)) {
    console.log("Cache hit:", url);
    return browserCache.get(url);
  }

  // Fetch and cache
  console.log("Fetching:", url);
  const resource = fetch(url).then(r => r.json());
  browserCache.set(url, resource);
  return resource;
}
```

### 2. API Response Caching

```javascript
class APICache {
  constructor(maxSize = 50) {
    this.cache = new LRUCache(maxSize);
  }

  async get(endpoint) {
    // Check cache
    const cached = this.cache.get(endpoint);
    if (cached) {
      return cached;
    }

    // Fetch from API
    const response = await fetch(endpoint);
    const data = await response.json();

    // Cache the response
    this.cache.set(endpoint, data);
    return data;
  }
}

const apiCache = new APICache(50);
const userData = await apiCache.get("/api/users/123");
```

### 3. Database Query Cache

```javascript
class QueryCache {
  constructor(maxSize = 100) {
    this.cache = new LRUCache(maxSize);
  }

  query(sql, params) {
    const key = `${sql}:${JSON.stringify(params)}`;
    
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const result = database.execute(sql, params);
    this.cache.set(key, result);
    return result;
  }
}
```

### 4. Image Caching

```javascript
class ImageCache {
  constructor(maxSize = 20) {
    this.cache = new LRUCache(maxSize);
  }

  loadImage(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    const img = new Image();
    img.src = url;
    img.onload = () => {
      this.cache.set(url, img);
    };
    return img;
  }
}
```

## Performance Characteristics

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| `get(key)` | O(1) | O(1) |
| `set(key, value)` | O(1) | O(1) |
| `has(key)` | O(1) | O(1) |
| `delete(key)` | O(1) | O(1) |

## Comparison with Other Cache Strategies

### LRU vs FIFO (First In First Out)

- **LRU**: Evicts least recently used (considers access patterns)
- **FIFO**: Evicts oldest item (doesn't consider access)

### LRU vs LFU (Least Frequently Used)

- **LRU**: Based on recency of access
- **LFU**: Based on frequency of access

### LRU vs Random Eviction

- **LRU**: Predictable, good for temporal locality
- **Random**: Simple but less efficient

## Implementation with Doubly Linked List

For very large caches, a doubly linked list + hash map can be more memory efficient:

```javascript
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCacheLinkedList {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addNode(node);
  }

  popTail() {
    const lastNode = this.tail.prev;
    this.removeNode(lastNode);
    return lastNode;
  }

  get(key) {
    const node = this.cache.get(key);
    if (!node) return -1;
    this.moveToHead(node);
    return node.value;
  }

  put(key, value) {
    const node = this.cache.get(key);
    if (!node) {
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this.addNode(newNode);
      if (this.cache.size > this.capacity) {
        const tail = this.popTail();
        this.cache.delete(tail.key);
      }
    } else {
      node.value = value;
      this.moveToHead(node);
    }
  }
}
```

## Best Practices

1. **Choose Appropriate Size**: Balance between memory usage and hit rate
2. **Monitor Hit Rate**: Track cache performance
3. **Consider TTL**: Add time-to-live for stale data
4. **Thread Safety**: Consider concurrency in multi-threaded environments
5. **Memory Management**: Be aware of memory constraints

## Common Interview Questions

LRU Cache is a popular interview question. Key points to remember:
- Use `Map` for O(1) operations
- Maintain insertion order (Map does this automatically)
- Move accessed items to end
- Remove first item when cache is full

## Summary

LRU Cache is an essential data structure for:
- **Performance optimization**: Reducing expensive operations
- **Memory management**: Efficient use of limited cache space
- **Web applications**: Caching API responses, images, etc.
- **System design**: Used in databases, operating systems, etc.

The implementation using JavaScript's `Map` is elegant and efficient, providing O(1) operations for all cache operations while maintaining the LRU eviction policy.
