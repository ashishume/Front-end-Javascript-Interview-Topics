# Function Chaining in JavaScript

Function chaining (also known as method chaining) is a technique that allows you to call multiple methods on an object in a single statement, where each method returns the object itself (or a chainable value), enabling subsequent method calls. This pattern creates fluent, readable APIs that are common in libraries like jQuery, Lodash, and many modern JavaScript frameworks.

## What is Function Chaining?

Function chaining allows you to write code like this:

```javascript
calculator.add(10).multiply(2).divide(2).add(2);
// Instead of:
// calculator.add(10);
// calculator.multiply(2);
// calculator.divide(2);
// calculator.add(2);
```

## Basic Implementation

### Simple Chaining Pattern

The key to function chaining is returning `this` from each method:

```javascript
const operations = function () {
  this.result = 0;

  this.add = function (a) {
    this.result = this.result + a;
    return this; // Return context to allow chaining
  };

  this.multiply = function (a) {
    if (this.result === 0) this.result = 1;
    this.result = this.result * a;
    return this; // Return context
  };

  this.subtract = function (a) {
    this.result = this.result - a;
    return this;
  };

  this.divide = function (a) {
    this.result = this.result / a;
    return this;
  };

  this.getValue = function () {
    return this.result;
  };
};

const obj = new operations();
const result = obj.add(10).multiply(2).divide(2).add(2);
console.log(result.getValue()); // 12
```

### Object Literal Pattern

```javascript
const ComputeFunc = function () {
  return {
    value: 0,
    add: function (val) {
      this.value += val;
      return this; // Chainable
    },
    subtract: function (val) {
      this.value -= val;
      return this;
    },
    multiply: function (val) {
      this.value *= val;
      return this;
    },
    divide: function (val) {
      this.value /= val;
      return this;
    },
    getValue: function () {
      return this.value;
    },
  };
};

const amount = ComputeFunc().add(6).subtract(1).multiply(2).divide(5);
console.log(amount.getValue()); // 2
```

## Advanced Patterns

### 1. Conditional Chaining

Chain methods conditionally:

```javascript
class QueryBuilder {
  constructor() {
    this.query = {};
  }

  select(fields) {
    this.query.select = fields;
    return this;
  }

  where(condition) {
    if (!this.query.where) {
      this.query.where = [];
    }
    this.query.where.push(condition);
    return this;
  }

  orderBy(field, direction = "ASC") {
    this.query.orderBy = { field, direction };
    return this;
  }

  limit(count) {
    this.query.limit = count;
    return this;
  }

  build() {
    return this.query;
  }
}

// Usage
const query = new QueryBuilder()
  .select(["name", "email"])
  .where({ age: { $gt: 18 } })
  .where({ status: "active" })
  .orderBy("name", "ASC")
  .limit(10)
  .build();
```

### 2. Chain with Different Return Types

Some methods return the object, others return values:

```javascript
class StringProcessor {
  constructor(str) {
    this.value = str;
  }

  toUpperCase() {
    this.value = this.value.toUpperCase();
    return this; // Chainable
  }

  reverse() {
    this.value = this.value.split("").reverse().join("");
    return this; // Chainable
  }

  getLength() {
    return this.value.length; // Not chainable - returns number
  }

  getValue() {
    return this.value; // Not chainable - returns string
  }
}

const processor = new StringProcessor("hello");
processor.toUpperCase().reverse(); // Chainable
const length = processor.getLength(); // Breaks chain, returns number
```

### 3. Lazy Evaluation

Chain operations but execute them only when needed:

```javascript
class LazyArray {
  constructor(array) {
    this.operations = [];
    this.source = array;
  }

  map(fn) {
    this.operations.push({ type: "map", fn });
    return this;
  }

  filter(fn) {
    this.operations.push({ type: "filter", fn });
    return this;
  }

  execute() {
    let result = this.source;
    this.operations.forEach((op) => {
      if (op.type === "map") {
        result = result.map(op.fn);
      } else if (op.type === "filter") {
        result = result.filter(op.fn);
      }
    });
    return result;
  }
}

const lazy = new LazyArray([1, 2, 3, 4, 5])
  .map((x) => x * 2)
  .filter((x) => x > 5)
  .execute(); // Executes all operations at once
```

## Real-World Examples

### Example 1: DOM Manipulation (jQuery-style)

```javascript
class DOMElement {
  constructor(selector) {
    this.element = document.querySelector(selector);
  }

  addClass(className) {
    if (this.element) {
      this.element.classList.add(className);
    }
    return this;
  }

  removeClass(className) {
    if (this.element) {
      this.element.classList.remove(className);
    }
    return this;
  }

  setText(text) {
    if (this.element) {
      this.element.textContent = text;
    }
    return this;
  }

  setStyle(property, value) {
    if (this.element) {
      this.element.style[property] = value;
    }
    return this;
  }

  on(event, handler) {
    if (this.element) {
      this.element.addEventListener(event, handler);
    }
    return this;
  }
}

// Usage
new DOMElement("#myButton")
  .addClass("btn-primary")
  .setText("Click Me")
  .setStyle("padding", "10px")
  .on("click", () => console.log("Clicked!"));
```

### Example 2: HTTP Request Builder

```javascript
class RequestBuilder {
  constructor() {
    this.config = {
      method: "GET",
      headers: {},
      body: null,
    };
  }

  method(method) {
    this.config.method = method.toUpperCase();
    return this;
  }

  url(url) {
    this.config.url = url;
    return this;
  }

  header(key, value) {
    this.config.headers[key] = value;
    return this;
  }

  body(data) {
    this.config.body = JSON.stringify(data);
    this.header("Content-Type", "application/json");
    return this;
  }

  async send() {
    const response = await fetch(this.config.url, {
      method: this.config.method,
      headers: this.config.headers,
      body: this.config.body,
    });
    return response.json();
  }
}

// Usage
const data = await new RequestBuilder()
  .method("POST")
  .url("/api/users")
  .header("Authorization", "Bearer token123")
  .body({ name: "John", email: "john@example.com" })
  .send();
```

### Example 3: Validation Chain

```javascript
class Validator {
  constructor(value) {
    this.value = value;
    this.errors = [];
  }

  required(message = "This field is required") {
    if (!this.value || this.value.trim() === "") {
      this.errors.push(message);
    }
    return this;
  }

  minLength(length, message) {
    if (this.value && this.value.length < length) {
      this.errors.push(message || `Must be at least ${length} characters`);
    }
    return this;
  }

  email(message = "Invalid email format") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
      this.errors.push(message);
    }
    return this;
  }

  isValid() {
    return this.errors.length === 0;
  }

  getErrors() {
    return this.errors;
  }
}

// Usage
const validator = new Validator("user@example.com")
  .required()
  .email()
  .minLength(5);

if (validator.isValid()) {
  console.log("Valid!");
} else {
  console.log(validator.getErrors());
}
```

## Function Chaining with Array Methods

JavaScript arrays already support chaining:

```javascript
const result = [1, 2, 3, 4, 5]
  .filter((n) => n % 2 === 0) // [2, 4]
  .map((n) => n * 2) // [4, 8]
  .reduce((sum, n) => sum + n, 0); // 12
```

## Benefits

1. **Readability**: Code reads like natural language
2. **Conciseness**: Fewer lines of code
3. **Fluent API**: Creates intuitive interfaces
4. **Composability**: Easy to combine operations
5. **Expressiveness**: Code intent is clearer

## Drawbacks

1. **Debugging**: Harder to debug (can't set breakpoints between chained calls)
2. **Error Handling**: Difficult to handle errors in the middle of a chain
3. **Performance**: May create intermediate objects
4. **Overuse**: Can make code less readable if overused

## Best Practices

1. **Return `this`**: Methods that modify state should return `this`
2. **Terminal Methods**: Some methods should break the chain (like `getValue()`)
3. **Immutable Chaining**: Consider returning new instances instead of modifying `this`
4. **Clear API**: Make it obvious which methods are chainable
5. **Error Handling**: Consider how errors propagate through the chain

## Immutable Chaining

Return new instances instead of modifying `this`:

```javascript
class ImmutableCalculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(n) {
    return new ImmutableCalculator(this.value + n);
  }

  multiply(n) {
    return new ImmutableCalculator(this.value * n);
  }

  getValue() {
    return this.value;
  }
}

const calc1 = new ImmutableCalculator(10);
const calc2 = calc1.add(5).multiply(2);
console.log(calc1.getValue()); // 10 (unchanged)
console.log(calc2.getValue()); // 30
```

## Summary

Function chaining is a powerful pattern that:

- Creates **fluent, readable APIs**
- Enables **concise code**
- Improves **code expressiveness**
- Is used in **many popular libraries**

Use chaining when:

- You have multiple related operations
- You want a fluent API
- Operations are naturally sequential

Avoid overusing it when:

- Operations are independent
- Error handling is critical
- Debugging is difficult

Function chaining is a fundamental pattern in modern JavaScript development, making code more expressive and easier to read.
