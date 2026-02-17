# Pipe and Compose in JavaScript

Pipe and Compose are functional programming utilities that allow you to combine multiple functions into a single function. They help eliminate nested function calls and create more readable, maintainable code by processing data through a series of transformations.

## The Problem They Solve

When you need to apply multiple transformations to data, you often end up with deeply nested function calls:

```javascript
const getName = () => "ashish";
const capitalizeName = (arg) => arg.toUpperCase();
const reverseString = (arg) => arg.split("").reverse().join("");

// Nested approach - hard to read
const result = reverseString(capitalizeName(getName()));
```

This becomes increasingly difficult to read and maintain as more functions are added.

## Pipe Function

Pipe executes functions from **left to right**, passing the result of each function as input to the next.

```javascript
const pipe = (...functions) => {
  return (args) => {
    return functions.reduce(
      (currentValue, currentFunction) => currentFunction(currentValue),
      args
    );
  };
};

// Usage
const getName = () => "ashish";
const capitalizeName = (arg) => arg.toUpperCase();
const reverseString = (arg) => arg.split("").reverse().join("");

const transformName = pipe(getName, capitalizeName, reverseString);
const result = transformName(); // "HSIHA"
```

### How Pipe Works

1. Takes any number of functions as arguments using rest parameters
2. Returns a new function that accepts the initial value
3. Uses `reduce` to apply each function sequentially from left to right
4. Each function receives the result of the previous function

### Example: Data Processing Pipeline

```javascript
const addPrefix = (str) => `Hello, ${str}`;
const addSuffix = (str) => `${str}!`;
const toUpperCase = (str) => str.toUpperCase();

const greet = pipe(addPrefix, toUpperCase, addSuffix);
console.log(greet("world")); // "HELLO, WORLD!"
```

## Compose Function

Compose executes functions from **right to left**, which is the opposite direction of pipe. It's useful when you want to think about transformations in a different order.

```javascript
const compose = (...functions) => {
  return (args) => {
    return functions.reduceRight(
      (currentValue, currentFunction) => currentFunction(currentValue),
      args
    );
  };
};

// Usage
const getName = () => "ashish";
const capitalizeName = (arg) => arg.toUpperCase();
const reverseString = (arg) => arg.split("").reverse().join("");

const transformName = compose(reverseString, capitalizeName, getName);
const result = transformName(); // "HSIHA"
```

### How Compose Works

1. Similar to pipe, but uses `reduceRight` instead of `reduce`
2. Functions are applied from right to left
3. The rightmost function receives the initial value first

### Example: Mathematical Operations

```javascript
const add = (x) => (y) => x + y;
const multiply = (x) => (y) => x * y;
const subtract = (x) => (y) => y - x;

// Compose: right to left
// First: add(5), then: multiply(2), then: subtract(3)
const calculate = compose(subtract(3), multiply(2), add(5));
console.log(calculate(10)); // ((10 + 5) * 2) - 3 = 27
```

## Pipe vs Compose

| Aspect         | Pipe                           | Compose                    |
| -------------- | ------------------------------ | -------------------------- |
| Direction      | Left to Right                  | Right to Left              |
| Readability    | More intuitive (top-to-bottom) | Mathematically traditional |
| Use Case       | Data transformation pipelines  | Function composition       |
| Implementation | `reduce`                       | `reduceRight`              |

### Visual Comparison

```javascript
// Pipe: f(g(h(x))) - reads left to right
pipe(h, g, f)(x);

// Compose: f(g(h(x))) - reads right to left
compose(f, g, h)(x);
```

## Real-World Examples

### 1. User Data Processing

```javascript
const fetchUser = async (id) => ({
  id,
  name: "John Doe",
  email: "john@example.com",
});
const validateUser = (user) => ({ ...user, isValid: true });
const formatUser = (user) => ({
  id: user.id,
  displayName: user.name.toUpperCase(),
  email: user.email,
});

const processUser = pipe(fetchUser, validateUser, formatUser);
// Note: For async functions, you'd need an async pipe variant
```

### 2. String Processing

```javascript
const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const removeSpaces = (str) => str.replace(/\s+/g, "");
const addPrefix = (str) => `user_${str}`;

const normalizeUsername = pipe(trim, toLowerCase, removeSpaces, addPrefix);
console.log(normalizeUsername("  John Doe  ")); // "user_johndoe"
```

### 3. Array Processing

```javascript
const filterEvens = (arr) => arr.filter((n) => n % 2 === 0);
const double = (arr) => arr.map((n) => n * 2);
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0);

const processNumbers = pipe(filterEvens, double, sum);
console.log(processNumbers([1, 2, 3, 4, 5, 6])); // 24 (2+4+6)*2
```

## Advanced: Async Pipe

For handling asynchronous functions, you need an async-aware version:

```javascript
const asyncPipe = (...functions) => {
  return async (args) => {
    let result = args;
    for (const fn of functions) {
      result = await fn(result);
    }
    return result;
  };
};

// Usage
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const processData = (data) => data.filter((item) => item.active);
const transformData = (data) =>
  data.map((item) => ({ ...item, processed: true }));

const pipeline = asyncPipe(fetchData, processData, transformData);
const result = await pipeline("/api/data");
```

## Benefits

1. **Readability**: Code reads like a pipeline of transformations
2. **Maintainability**: Easy to add or remove steps
3. **Reusability**: Create reusable transformation pipelines
4. **Testability**: Each function can be tested independently
5. **Functional Style**: Encourages pure functions and immutability

## Best Practices

1. **Keep functions pure**: Each function should not have side effects
2. **Single responsibility**: Each function should do one thing
3. **Type consistency**: Ensure output of one function matches input of the next
4. **Error handling**: Consider adding error handling for production use
5. **Documentation**: Document what each pipeline does

## Common Use Cases

- Data transformation pipelines
- API response processing
- Form validation chains
- Image processing workflows
- Logging and monitoring pipelines
- Data sanitization and normalization

Pipe and Compose are powerful tools that make functional programming in JavaScript more elegant and maintainable, especially when dealing with complex data transformations.
