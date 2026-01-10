# WeakRef in JavaScript

## Overview
WeakRef is an object that holds a weak reference to another object, which allows the referenced object to be garbage collected even if there are no strong references to it. This is useful for scenarios where you want to hold onto an object as long as it's needed, but you don't want to prevent it from being garbage collected once it's no longer in use.

## Basic Syntax

```javascript
const weakRef = new WeakRef(targetObject);

// Access the target object
const target = weakRef.deref();

// Check if target still exists
if (target) {
  // Use the target
} else {
  // Target has been garbage collected
}
```

## Basic Example

```javascript
let obj = { foo: "bar" };
const weakRef = new WeakRef(obj);

// Access the target object through the WeakRef
console.log(weakRef.deref()); // Output: { foo: 'bar' }

// Once the strong reference to the original object is removed,
// the WeakRef might return undefined when you try to access it
obj = null;

// After garbage collection, deref() may return undefined
// Note: Garbage collection timing is non-deterministic
console.log(weakRef.deref()); // May output: undefined
```

## Key Concepts

### Strong vs Weak References

```javascript
// Strong reference - prevents garbage collection
const strongRef = { data: "important" };

// Weak reference - allows garbage collection
const weakRef = new WeakRef(strongRef);

// Remove strong reference
const temp = strongRef;
// strongRef = null; // If this was the only reference, object can be GC'd

// WeakRef still holds a reference, but it's weak
console.log(weakRef.deref()); // May still work if not GC'd yet
```

## Use Cases

### 1. Caching with Automatic Cleanup

```javascript
class WeakCache {
  constructor() {
    this.cache = new Map();
  }
  
  set(key, value) {
    const weakRef = new WeakRef(value);
    this.cache.set(key, weakRef);
  }
  
  get(key) {
    const weakRef = this.cache.get(key);
    if (!weakRef) return undefined;
    
    const value = weakRef.deref();
    if (!value) {
      // Value was garbage collected, remove from cache
      this.cache.delete(key);
      return undefined;
    }
    
    return value;
  }
  
  cleanup() {
    // Remove entries where values have been GC'd
    for (const [key, weakRef] of this.cache.entries()) {
      if (!weakRef.deref()) {
        this.cache.delete(key);
      }
    }
  }
}
```

### 2. DOM Element Tracking

```javascript
class ElementTracker {
  constructor() {
    this.trackedElements = new Map();
  }
  
  track(id, element) {
    const weakRef = new WeakRef(element);
    this.trackedElements.set(id, weakRef);
  }
  
  getElement(id) {
    const weakRef = this.trackedElements.get(id);
    if (!weakRef) return null;
    
    const element = weakRef.deref();
    if (!element) {
      // Element was removed from DOM
      this.trackedElements.delete(id);
      return null;
    }
    
    return element;
  }
}
```

### 3. Temporary Object References

```javascript
function processLargeObject(data) {
  const largeObject = processData(data);
  const weakRef = new WeakRef(largeObject);
  
  // Store weak reference for potential later use
  // But allow garbage collection if not needed
  return {
    getObject: () => weakRef.deref(),
    process: () => {
      const obj = weakRef.deref();
      if (obj) {
        return performOperation(obj);
      }
      return null;
    }
  };
}
```

## FinalizationRegistry

Often used together with WeakRef, FinalizationRegistry allows you to perform cleanup when an object is garbage collected:

```javascript
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Object with value ${heldValue} was garbage collected`);
  // Perform cleanup
});

let obj = { data: "important" };
const weakRef = new WeakRef(obj);

// Register for cleanup notification
registry.register(obj, "some-identifier");

obj = null;
// Eventually, when obj is GC'd, the cleanup callback will run
```

## Complete Example: Weak Cache with Cleanup

```javascript
class WeakCacheWithCleanup {
  constructor() {
    this.cache = new Map();
    this.registry = new FinalizationRegistry((key) => {
      // Cleanup when object is garbage collected
      this.cache.delete(key);
      console.log(`Cleaned up cache entry for: ${key}`);
    });
  }
  
  set(key, value) {
    const weakRef = new WeakRef(value);
    this.cache.set(key, weakRef);
    
    // Register for cleanup notification
    this.registry.register(value, key);
  }
  
  get(key) {
    const weakRef = this.cache.get(key);
    if (!weakRef) return undefined;
    
    const value = weakRef.deref();
    return value; // May be undefined if GC'd
  }
}
```

## Important Considerations

### 1. Non-Deterministic Garbage Collection

```javascript
// Garbage collection timing is not guaranteed
let obj = { data: "test" };
const weakRef = new WeakRef(obj);

obj = null;

// This might still work immediately
console.log(weakRef.deref()); // May still return the object

// Garbage collection happens when the engine decides
// You cannot rely on immediate cleanup
```

### 2. Always Check Before Use

```javascript
const weakRef = new WeakRef(someObject);

// Always check if the object still exists
const obj = weakRef.deref();
if (obj) {
  // Safe to use
  obj.doSomething();
} else {
  // Object was garbage collected
  console.log("Object no longer available");
}
```

### 3. Not Suitable for Primitive Values

```javascript
// WeakRef only works with objects, not primitives
// const weakRef = new WeakRef(42); // ❌ Error

const weakRef = new WeakRef({ value: 42 }); // ✅ Works
```

## Browser Support

WeakRef is supported in:
- Chrome 84+
- Firefox 79+
- Safari 14.1+
- Edge 84+

Note: WeakRef is a relatively new feature (ES2021), so ensure your target environments support it.

## When to Use WeakRef

**Use WeakRef when:**
- You need a cache that doesn't prevent garbage collection
- Tracking objects that may be removed from memory
- Building systems that should automatically clean up unused references
- Working with large objects that shouldn't be kept alive unnecessarily

**Don't use WeakRef when:**
- You need guaranteed object availability
- Working with primitives
- You need immediate cleanup (use strong references with manual cleanup instead)

## Best Practices

1. **Always check `deref()` result**: Never assume the object still exists
2. **Use with FinalizationRegistry**: For cleanup when objects are GC'd
3. **Don't rely on timing**: GC is non-deterministic
4. **Use for caching**: Perfect for caches that should auto-cleanup
5. **Combine with Maps**: Use Map to store WeakRef instances

## Summary

WeakRef provides a way to hold references to objects without preventing garbage collection. It's particularly useful for caching scenarios and tracking objects that may be removed from memory. Combined with FinalizationRegistry, it enables automatic cleanup of resources when objects are no longer needed.

