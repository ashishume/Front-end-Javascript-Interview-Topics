# Call, Bind, and Apply in JavaScript

## Overview
`call`, `bind`, and `apply` are methods available on all JavaScript functions. They allow you to control the value of `this` when a function is executed, and in the case of `call` and `apply`, immediately invoke the function.

## The `this` Problem

In JavaScript, the value of `this` depends on how a function is called. Sometimes you need to explicitly set what `this` should refer to.

```javascript
const person = {
  name: "John",
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const greetFunction = person.greet;
greetFunction(); // "Hello, I'm undefined" (this is window/global)
```

## call()

### Syntax
```javascript
function.call(thisArg, arg1, arg2, ...)
```

### Characteristics
- **Immediately invokes** the function
- Sets `this` to the first argument
- Accepts arguments as **comma-separated values**
- Returns the result of the function call

### Example

```javascript
const obj1 = {
  name: "Ashish",
  age: 1,
};

const obj2 = {
  name: "Akash",
  age: 2,
};

function randomFunc(x, y) {
  return `<div>
    My name is ${this.name} and friend is ${x} and ${y}
  </div>`;
}

// Using call
const callMethod = randomFunc.call(obj2, "aa", "Raahul");
console.log(callMethod);
// Output: "<div>My name is Akash and friend is aa and Raahul</div>"
```

### More Examples

```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

introduce.call(person1, "Hello", "!"); // "Hello, I'm Alice!"
introduce.call(person2, "Hi", ".");     // "Hi, I'm Bob."
```

## apply()

### Syntax
```javascript
function.apply(thisArg, [argsArray])
```

### Characteristics
- **Immediately invokes** the function
- Sets `this` to the first argument
- Accepts arguments as an **array**
- Returns the result of the function call
- Useful when you have an array of arguments

### Example

```javascript
const obj1 = {
  name: "Ashish",
  age: 1,
};

function randomFunc(x, y) {
  return `<div>
    My name is ${this.name} and friend is ${x} and ${y}
  </div>`;
}

// Using apply - arguments passed as array
const applyMethod = randomFunc.apply(obj1, ["Rahul", "Diya"]);
console.log(applyMethod);
// Output: "<div>My name is Ashish and friend is Rahul and Diya</div>"
```

### Practical Use Case: Array Methods

```javascript
// Finding max/min in array
const numbers = [5, 6, 2, 3, 7];

// Math.max doesn't accept arrays directly
const max = Math.max.apply(null, numbers); // 7
const min = Math.min.apply(null, numbers); // 2

// ES6 alternative (spread operator)
const maxES6 = Math.max(...numbers); // 7
```

### Combining Arrays

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

// Using apply to push array2 into array1
array1.push.apply(array1, array2);
console.log(array1); // [1, 2, 3, 4, 5, 6]

// ES6 alternative
array1.push(...array2);
```

## bind()

### Syntax
```javascript
function.bind(thisArg, arg1, arg2, ...)
```

### Characteristics
- **Does NOT invoke** the function immediately
- Returns a **new function** with `this` bound to the first argument
- Accepts arguments as **comma-separated values**
- Can be called later
- Useful for creating functions with preset `this` and arguments

### Example

```javascript
const obj1 = {
  name: "Ashish",
  age: 1,
};

function randomFunc(x, y) {
  return `<div>
    My name is ${this.name} and friend is ${x} and ${y}
  </div>`;
}

// Using bind - returns a new function
const bindMethod = randomFunc.bind(obj1, "Amy", "Ayush");
console.log(bindMethod()); // Must call with () to execute
// Output: "<div>My name is Ashish and friend is Amy and Ayush</div>"
```

### Practical Use Case: Event Handlers

```javascript
class Button {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }

  handleClick() {
    this.clickCount++;
    console.log(`${this.name} clicked ${this.clickCount} times`);
  }
}

const button = new Button("Submit");

// Without bind - this would be undefined
document.getElementById('btn').addEventListener('click', button.handleClick);
// ❌ Error: Cannot read property 'clickCount' of undefined

// With bind - this is correctly set
document.getElementById('btn').addEventListener('click', button.handleClick.bind(button));
// ✅ Works correctly
```

### Partial Application with bind()

```javascript
function multiply(a, b, c) {
  return a * b * c;
}

// Bind first argument
const multiplyBy2 = multiply.bind(null, 2);
console.log(multiplyBy2(3, 4)); // 24 (2 * 3 * 4)

// Bind first two arguments
const multiplyBy2And3 = multiply.bind(null, 2, 3);
console.log(multiplyBy2And3(4)); // 24 (2 * 3 * 4)
```

## Comparison Table

| Method | Invokes Immediately? | Arguments Format | Returns | Use Case |
|--------|---------------------|-----------------|---------|----------|
| **call** | Yes | Comma-separated | Function result | When you know arguments and want immediate execution |
| **apply** | Yes | Array | Function result | When you have arguments as array or unknown number |
| **bind** | No | Comma-separated | New function | When you want to create a function for later use |

## Side-by-Side Comparison

```javascript
const person = {
  name: "John",
  age: 30
};

function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}, age ${this.age}${punctuation}`);
}

// call - immediate execution, comma-separated args
introduce.call(person, "Hello", "!"); 
// Output: "Hello, I'm John, age 30!"

// apply - immediate execution, array args
introduce.apply(person, ["Hi", "."]); 
// Output: "Hi, I'm John, age 30."

// bind - returns function, can call later
const boundIntroduce = introduce.bind(person, "Hey", "!");
boundIntroduce(); 
// Output: "Hey, I'm John, age 30!"
```

## Common Patterns

### 1. Borrowing Methods

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  getFullName: function() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const person2 = {
  firstName: "Jane",
  lastName: "Smith"
};

// Borrow the method from person
const fullName = person.getFullName.call(person2);
console.log(fullName); // "Jane Smith"
```

### 2. Function Currying with bind()

```javascript
function add(a, b, c) {
  return a + b + c;
}

// Create curried versions
const add5 = add.bind(null, 5);
const add5And10 = add.bind(null, 5, 10);

console.log(add5(10, 15));     // 30 (5 + 10 + 15)
console.log(add5And10(15));    // 30 (5 + 10 + 15)
```

### 3. Setting Context in Callbacks

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log(this.count);
  }
}

const counter = new Counter();

// Without bind
setTimeout(counter.increment, 1000); // ❌ this is undefined

// With bind
setTimeout(counter.increment.bind(counter), 1000); // ✅ Works
```

## ES6 Arrow Functions Note

Arrow functions have **lexical `this`** - they don't have their own `this` and cannot be used with `call`, `bind`, or `apply` to change `this`.

```javascript
const obj = {
  name: "John",
  regular: function() {
    console.log(this.name); // "John"
  },
  arrow: () => {
    console.log(this.name); // undefined (this is from outer scope)
  }
};

obj.regular(); // "John"
obj.arrow();   // undefined

// call/bind/apply don't work with arrow functions
const boundArrow = obj.arrow.bind({ name: "Jane" });
boundArrow(); // Still undefined
```

## Key Takeaways

1. **call()** - Immediately invokes function with specified `this` and comma-separated arguments
2. **apply()** - Immediately invokes function with specified `this` and array of arguments
3. **bind()** - Returns new function with bound `this` and optional preset arguments
4. **Use call/apply** when you need immediate execution
5. **Use bind** when you need to create a function for later use
6. **apply is useful** when you have an array of arguments
7. **Arrow functions** cannot use call/bind/apply to change `this`

