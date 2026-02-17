# Spread vs Rest Operators in JavaScript

## Overview
The spread (`...`) and rest (`...`) operators use the same syntax but serve different purposes. The **spread** operator expands iterables into individual elements, while the **rest** operator collects multiple elements into an array.

## Spread Operator

The spread operator expands an iterable (array, string, object) into individual elements.

### Array Spreading

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1]; // [1, 2, 3]

// Add elements
const withNew = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Function arguments
Math.max(...arr1); // 3
```

### Object Spreading

```javascript
const obj1 = {
  name: "Ash",
  lName: "Dev",
};

// Copy object
const obj2 = { ...obj1 }; // { name: "Ash", lName: "Dev" }

// Merge objects
const obj3 = { ...obj1, age: 25 }; // { name: "Ash", lName: "Dev", age: 25 }

// Override properties
const obj4 = { ...obj1, name: "John" }; // { name: "John", lName: "Dev" }

// Combine multiple objects
const merged = { ...obj1, ...obj2, ...obj3 };
```

### String Spreading

```javascript
const str = "Hello";
const chars = [...str]; // ["H", "e", "l", "l", "o"]
```

### Use Cases

```javascript
// Clone arrays/objects (shallow copy)
const original = [1, 2, 3];
const clone = [...original];

// Merge arrays
const merged = [...arr1, ...arr2, ...arr3];

// Convert array-like to array
const nodeList = document.querySelectorAll("div");
const array = [...nodeList];

// Pass array as function arguments
function sum(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
sum(...numbers); // 6
```

## Rest Operator

The rest operator collects remaining arguments into an array. It's used in function parameters and destructuring.

### Function Parameters

```javascript
function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10
sum(5, 10); // 15
```

### Rest with Named Parameters

```javascript
function greet(greeting, ...names) {
  return `${greeting}, ${names.join(", ")}!`;
}

greet("Hello", "John", "Jane", "Bob");
// "Hello, John, Jane, Bob!"
```

### Array Destructuring

```javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]
```

### Object Destructuring

```javascript
const { name, age, ...rest } = {
  name: "John",
  age: 30,
  city: "NYC",
  country: "USA"
};

console.log(name); // "John"
console.log(age);  // 30
console.log(rest); // { city: "NYC", country: "USA" }
```

### Rest Must Be Last

```javascript
// ✅ Correct - rest at the end
function example(a, b, ...rest) {}

// ❌ Error - rest cannot be in the middle
function example(a, ...rest, b) {} // SyntaxError
```

## Key Differences

| Aspect | Spread | Rest |
|--------|--------|------|
| **Purpose** | Expands iterables | Collects elements |
| **Usage** | Arrays, objects, function calls | Function parameters, destructuring |
| **Position** | Anywhere | Must be last in parameters/destructuring |
| **Result** | Individual elements | Array of elements |

## Practical Examples

### Combining Both

```javascript
function processData(first, second, ...rest) {
  const allData = [first, second, ...rest];
  return allData.map(item => item * 2);
}

processData(1, 2, 3, 4, 5); // [2, 4, 6, 8, 10]
```

### Flexible Function

```javascript
function createUser(name, email, ...additionalInfo) {
  return {
    name,
    email,
    ...additionalInfo.reduce((acc, info) => ({ ...acc, ...info }), {})
  };
}

createUser("John", "john@example.com", 
  { age: 30 }, 
  { city: "NYC" }
);
// { name: "John", email: "john@example.com", age: 30, city: "NYC" }
```

### Array Manipulation

```javascript
// Remove first element, keep rest
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(rest); // [2, 3, 4, 5]

// Add to beginning, spread rest
const newArray = [0, ...rest]; // [0, 2, 3, 4, 5]
```

## Common Patterns

```javascript
// Default parameters with rest
function example(a = 1, b = 2, ...rest) {
  return { a, b, rest };
}

// Rest in arrow functions
const sum = (...args) => args.reduce((a, b) => a + b, 0);

// Spread in array literals
const newArray = [...oldArray, newItem];

// Spread in object literals
const newObject = { ...oldObject, newProperty: value };
```

## Key Points
- **Spread (`...`)**: Expands iterables into individual elements
- **Rest (`...`)**: Collects remaining elements into an array
- Spread used in arrays, objects, and function calls
- Rest used in function parameters and destructuring
- Rest must always be the last parameter/element
- Both use the same syntax but serve opposite purposes

