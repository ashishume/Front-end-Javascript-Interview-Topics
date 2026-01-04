# For...in vs For...of Loops in JavaScript

## Overview
JavaScript provides two different loop constructs: `for...in` and `for...of`. They serve different purposes and iterate over different types of data structures.

## For...in Loop

The `for...in` loop iterates over the **enumerable properties** of an object, including inherited properties.

### Syntax

```javascript
for (let key in object) {
  console.log(key, object[key]);
}
```

### With Objects

```javascript
const obj = {
  a: 1,
  b: 2,
  c: "String",
};

for (let key in obj) {
  console.log(`${key} => ${obj[key]}`);
}
// a => 1
// b => 2
// c => String
```

### With Arrays

```javascript
const arr = [5, 9, 1, 2, 3];

for (let index in arr) {
  console.log(`${index} => ${arr[index]}`);
}
// 0 => 5
// 1 => 9
// 2 => 1
// 3 => 2
// 4 => 3
```

### Important Notes

```javascript
// Iterates over enumerable properties (including inherited)
const parent = { inherited: "property" };
const child = Object.create(parent);
child.own = "property";

for (let key in child) {
  console.log(key); // "own", "inherited"
}

// Use hasOwnProperty to filter inherited properties
for (let key in child) {
  if (child.hasOwnProperty(key)) {
    console.log(key); // "own" only
  }
}
```

## For...of Loop

The `for...of` loop iterates over **iterable objects** (arrays, strings, maps, sets, etc.), giving you the values directly.

### Syntax

```javascript
for (let value of iterable) {
  console.log(value);
}
```

### With Arrays

```javascript
const arr = [5, 9, 1, 2, 3];

for (let val of arr) {
  console.log(val);
}
// 5
// 9
// 1
// 2
// 3
```

### With Strings

```javascript
const str = "Hello";

for (let char of str) {
  console.log(char);
}
// H
// e
// l
// l
// o
```

### With Objects (Using Object methods)

```javascript
const obj = {
  a: 1,
  b: 2,
  c: "String",
};

// Object.entries() - returns [key, value] pairs
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
// a 1
// b 2
// c String

// Object.keys() - returns keys
for (let key of Object.keys(obj)) {
  console.log(key);
}
// a
// b
// c

// Object.values() - returns values
for (let value of Object.values(obj)) {
  console.log(value);
}
// 1
// 2
// String
```

### With Maps and Sets

```javascript
// Map
const map = new Map([
  ["name", "John"],
  ["age", 30]
]);

for (let [key, value] of map) {
  console.log(key, value);
}
// name John
// age 30

// Set
const set = new Set([1, 2, 3, 3, 4]);

for (let value of set) {
  console.log(value);
}
// 1
// 2
// 3
// 4
```

## Key Differences

| Feature | For...in | For...of |
|---------|----------|-----------|
| **Iterates over** | Enumerable properties | Iterable values |
| **Returns** | Keys/indices | Values |
| **Works with** | Objects, arrays (as objects) | Arrays, strings, maps, sets, etc. |
| **Order** | Not guaranteed (objects) | Guaranteed (iterables) |
| **Inherited properties** | Yes (unless filtered) | No |
| **Use case** | Object properties | Array/iterable values |

## When to Use Each

### Use For...in When:
- Iterating over object properties
- Need to access both keys and values of objects
- Working with object enumerable properties

```javascript
const user = {
  name: "John",
  age: 30,
  city: "NYC"
};

for (let key in user) {
  if (user.hasOwnProperty(key)) {
    console.log(`${key}: ${user[key]}`);
  }
}
```

### Use For...of When:
- Iterating over array values
- Working with iterable collections
- Need direct access to values (not indices)

```javascript
const numbers = [1, 2, 3, 4, 5];

for (let num of numbers) {
  console.log(num * 2);
}
```

## Common Patterns

### Iterating Objects with For...of

```javascript
const obj = { a: 1, b: 2, c: 3 };

// Method 1: Object.entries()
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value);
}

// Method 2: Object.keys()
for (let key of Object.keys(obj)) {
  console.log(key, obj[key]);
}

// Method 3: Object.values()
for (let value of Object.values(obj)) {
  console.log(value);
}
```

### Getting Index with For...of

```javascript
const arr = ["a", "b", "c"];

// Using entries()
for (let [index, value] of arr.entries()) {
  console.log(index, value);
}
// 0 a
// 1 b
// 2 c
```

## Performance Considerations

- `for...of` is generally faster for arrays
- `for...in` can be slower due to property enumeration
- Both are slower than traditional `for` loops for simple iteration

## Key Points
- **For...in**: Iterates over object properties (keys/indices)
- **For...of**: Iterates over iterable values
- Use `for...in` for objects, `for...of` for arrays/iterables
- `for...in` includes inherited properties (use `hasOwnProperty` to filter)
- `for...of` provides direct access to values, not indices
- Use `Object.entries()`, `Object.keys()`, or `Object.values()` to iterate objects with `for...of`

