# Arrow Functions vs Normal Functions in JavaScript

## Overview
JavaScript provides two ways to define functions: normal functions (function declarations/expressions) and arrow functions (introduced in ES6). While they may seem similar, they have important differences that affect how they work, especially regarding `this`, `arguments`, and constructor usage.

## Key Differences

### 1. `this` Binding

**Normal Function**: Has its own `this` context that depends on how it's called.

```javascript
var a = 100;

function NormalFunc(a, b) {
  console.log(this.a); // For normal function, this.a prints the context's 'a'
  console.log(arguments[0]); // Works here
}

const ArrowFunc = (...args) => {
  console.log(this.a); // For arrow function, this.a still prints 100 (global)
  console.log(...args);
};

NormalFunc.call({ a: "Ashish" }, 81, 82); // Prints "Ashish"
ArrowFunc.call({ a: "Debnath" }, 85, 86); // Prints 100 (arrow function doesn't have its own context)
```

**Arrow Function**: Doesn't have its own `this`. It inherits `this` from the enclosing lexical scope (parent context).

### 2. `arguments` Object

**Normal Function**: Has access to the `arguments` object.

```javascript
function NormalFunc(a, b) {
  console.log(arguments[0]); // Works - prints first argument
  console.log(arguments[1]); // Works - prints second argument
}
```

**Arrow Function**: Doesn't have access to the `arguments` object. Use rest parameters instead.

```javascript
const ArrowFunc = (...args) => {
  // console.log(arguments[0]); // Error: arguments is not defined
  console.log(...args); // Use rest parameters instead
};
```

### 3. Constructor Usage

**Normal Function**: Can be used as a constructor with the `new` keyword.

```javascript
function Person(name) {
  this.name = name;
}

const person = new Person("John"); // Works
```

**Arrow Function**: Cannot be used as a constructor.

```javascript
const Person = (name) => {
  this.name = name;
};

const person = new Person("John"); // TypeError: Person is not a constructor
```

### 4. Hoisting

**Normal Function**: Function declarations are hoisted.

```javascript
sayHello(); // Works - prints "Hello"

function sayHello() {
  console.log("Hello");
}
```

**Arrow Function**: Arrow functions (as function expressions) are not hoisted.

```javascript
sayHello(); // TypeError: Cannot access 'sayHello' before initialization

const sayHello = () => {
  console.log("Hello");
};
```

## Summary Table

| Feature | Normal Function | Arrow Function |
|---------|----------------|----------------|
| `this` binding | Has its own `this` | Inherits `this` from parent scope |
| `arguments` object | ✅ Available | ❌ Not available (use rest params) |
| Constructor | ✅ Can use `new` | ❌ Cannot use `new` |
| Hoisting | ✅ Function declarations hoisted | ❌ Not hoisted |
| Duplicate parameters | ✅ Allowed | ❌ Not allowed |
| Implicit return | ❌ Requires `return` | ✅ Can return implicitly |

## Function Constructor

There's also a third way to create functions using the Function constructor:

```javascript
// Function Constructor
const myFunction = new Function("arg1", "arg2", "return arg1 + arg2;");
```

**Important Note**: Function constructor calls are not hoisted. You cannot call the function before it's defined in the code.

```javascript
const x = 10;

function createFunction1() {
  const x = 20;
  return new Function("return x;"); // This |x| refers to global |x|
}

function createFunction2() {
  const x = 20;
  function f() {
    return x; // This |x| refers to local |x| above
  }
  return f;
}

const f1 = createFunction1();
console.log(f1()); // 10 (global x)

const f2 = createFunction2();
console.log(f2()); // 20 (local x)
```

## When to Use Each

### Use Normal Functions When:
- You need `this` binding to the calling context
- You need to use the `arguments` object
- You need to create constructors
- You want function hoisting
- Working with object methods that need dynamic `this`

### Use Arrow Functions When:
- You want to preserve `this` from the enclosing scope
- You're writing short, simple functions
- You're using array methods (map, filter, reduce)
- You want implicit returns for concise code
- You're working with callbacks and want lexical `this`

## Examples

### Object Methods

```javascript
const obj = {
  name: "John",
  
  // Normal function - 'this' refers to obj
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  },
  
  // Arrow function - 'this' refers to global/window
  greetArrow: () => {
    console.log(`Hello, I'm ${this.name}`); // undefined
  }
};

obj.greet(); // "Hello, I'm John"
obj.greetArrow(); // "Hello, I'm undefined"
```

### Event Handlers

```javascript
class Button {
  constructor() {
    this.clicked = false;
  }
  
  // Normal function - 'this' refers to button instance
  handleClick() {
    this.clicked = true;
  }
  
  // Arrow function - preserves 'this' from class
  handleClickArrow = () => {
    this.clicked = true;
  }
}
```

### Array Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// Arrow functions are perfect for array methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

## Best Practices

1. Use arrow functions for short, simple functions
2. Use normal functions for object methods that need `this`
3. Use arrow functions in array methods for cleaner code
4. Use normal functions when you need the `arguments` object
5. Use normal functions when creating constructors
6. Be mindful of `this` binding when choosing between them
