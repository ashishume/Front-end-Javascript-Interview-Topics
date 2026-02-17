# Map, Set, WeakMap, and WeakSet in JavaScript

## Overview
JavaScript provides specialized collection types beyond plain objects and arrays: `Map`, `Set`, `WeakMap`, and `WeakSet`. Each serves different purposes and has unique characteristics.

## Map

A `Map` holds key-value pairs and remembers insertion order. Any value (objects or primitives) can be used as a key.

```javascript
const map = new Map();

// Setting values
map.set("name", "Ashish");
map.set("age", 25);
map.set(1, "one");

// Getting values
console.log(map.get("name")); // "Ashish"

// Size
console.log(map.size); // 3

// Checking existence
console.log(map.has("name")); // true

// Deleting
map.delete("age");

// Iteration
for (let [key, value] of map) {
  console.log(key, value);
}

map.forEach((value, key) => {
  console.log(key, value);
});
```

### Map vs Object

```javascript
// Map advantages:
// - Any type as key (objects, functions, primitives)
// - Maintains insertion order
// - Has size property
// - Better performance for frequent additions/deletions

const objKey = { id: 1 };
const map = new Map();
map.set(objKey, "value"); // Works

const obj = {};
obj[objKey] = "value"; // Converts to string "[object Object]"
```

## Set

A `Set` stores unique values of any type, maintaining insertion order.

```javascript
const set = new Set();

// Adding values
set.add("apple");
set.add("banana");
set.add("apple"); // Duplicate ignored

console.log(set.size); // 2
console.log(set.has("apple")); // true

// Iteration
for (let value of set) {
  console.log(value);
}

set.forEach(value => {
  console.log(value);
});

// Converting to array
const array = Array.from(set);
```

### Common Use Cases

```javascript
// Remove duplicates from array
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

// Union of sets
const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);
const union = new Set([...set1, ...set2]); // {1, 2, 3, 4, 5}
```

## WeakMap

A `WeakMap` is similar to `Map`, but:
- Keys must be objects (not primitives)
- Keys are weakly referenced (can be garbage collected)
- Not iterable
- No size property

```javascript
const weakMap = new WeakMap();

const key1 = { name: "object1" };
const key2 = function() {};
const key3 = window;

weakMap.set(key1, "value1");
weakMap.set(key2, "value2");
weakMap.set(key3, "value3");

console.log(weakMap.get(key1)); // "value1"

// Cannot use primitives as keys
// weakMap.set("string", "value"); // TypeError
```

### Use Case: Private Data

```javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  
  getName() {
    return privateData.get(this).name;
  }
}
```

## WeakSet

A `WeakSet` is similar to `Set`, but:
- Only objects can be added
- Objects are weakly referenced
- Not iterable
- No size property

```javascript
const weakSet = new WeakSet();

const obj1 = { id: 1 };
const obj2 = { id: 2 };

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1)); // true

// Cannot add primitives
// weakSet.add("string"); // TypeError
```

## Key Differences Summary

| Feature | Map | Set | WeakMap | WeakSet |
|---------|-----|-----|---------|---------|
| Key Type | Any | N/A | Objects only | Objects only |
| Value Type | Any | Unique values | Any | N/A |
| Iterable | Yes | Yes | No | No |
| Size Property | Yes | Yes | No | No |
| Weak References | No | No | Yes | Yes |

## Key Points
- Use `Map` when you need object keys or insertion order matters
- Use `Set` to store unique values
- Use `WeakMap`/`WeakSet` for private data or metadata that shouldn't prevent garbage collection
- `WeakMap` and `WeakSet` are not iterable and have no size property

