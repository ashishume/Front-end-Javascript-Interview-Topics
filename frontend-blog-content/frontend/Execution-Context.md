# Execution Context in JavaScript

## Overview
An **Execution Context** is an abstract concept that holds information about the environment in which the current code is being executed. It contains the code that's currently running and everything that aids in its execution.

## Types of Execution Context

### 1. Global Execution Context (GEC)
- Created when JavaScript engine receives a script file
- There is **only one GEC** per JavaScript file
- Represents the global scope
- Contains:
  - Global object (window in browser, global in Node.js)
  - `this` keyword (points to global object)
  - Variables and functions declared in global scope

### 2. Function Execution Context (FEC)
- Created whenever a function is called
- There can be **multiple FECs** in the same GEC
- Each function call creates a new FEC
- Contains:
  - Function's local variables
  - Function's parameters
  - `this` keyword (depends on how function is called)
  - Reference to outer environment (lexical scope)

## Execution Context Phases

### Phase 1: Creation Phase (Hoisting)
1. **Creation of Variable Object (VO)**
   - Function declarations are stored (with their definitions)
   - Variable declarations are stored (initialized as `undefined` for `var`)
   - `let` and `const` are stored but not initialized (Temporal Dead Zone)

2. **Creation of Scope Chain**
   - Links to outer environments
   - Determines variable access

3. **Determining `this` value**
   - Set based on how function is called

### Phase 2: Execution Phase
- Code is executed line by line
- Variables are assigned values
- Functions are called

## Example: Execution Context Flow

```javascript
var globalVar = "I'm global";

function outerFunction(param1) {
  var outerVar = "I'm outer";
  
  function innerFunction(param2) {
    var innerVar = "I'm inner";
    console.log(globalVar, outerVar, innerVar, param1, param2);
  }
  
  innerFunction("inner param");
}

outerFunction("outer param");
```

### Execution Flow:

1. **Global Execution Context Created**
   - `globalVar` declared (hoisted, initialized as `undefined`)
   - `outerFunction` declared (hoisted with definition)

2. **Global Execution Phase**
   - `globalVar = "I'm global"` executed
   - `outerFunction("outer param")` called

3. **Function Execution Context for outerFunction Created**
   - `param1 = "outer param"`
   - `outerVar` declared (hoisted, initialized as `undefined`)
   - `innerFunction` declared (hoisted with definition)
   - Scope chain: [outerFunction FEC, GEC]

4. **Function Execution Phase for outerFunction**
   - `outerVar = "I'm outer"` executed
   - `innerFunction("inner param")` called

5. **Function Execution Context for innerFunction Created**
   - `param2 = "inner param"`
   - `innerVar` declared (hoisted, initialized as `undefined`)
   - Scope chain: [innerFunction FEC, outerFunction FEC, GEC]

6. **Function Execution Phase for innerFunction**
   - `innerVar = "I'm inner"` executed
   - `console.log()` executed (accesses variables from all scopes)

## Scope Chain

The **Scope Chain** is the mechanism that allows inner functions to access variables from outer functions. It's created during the creation phase of the execution context.

```javascript
var a = 1;

function level1() {
  var b = 2;
  
  function level2() {
    var c = 3;
    
    function level3() {
      var d = 4;
      // Can access: a, b, c, d
      console.log(a, b, c, d);
    }
    
    level3();
  }
  
  level2();
}

level1();
```

**Scope Chain for level3:**
```
level3 FEC → level2 FEC → level1 FEC → GEC
```

## `this` in Execution Context

The value of `this` is determined by how a function is called:

### 1. Global Context
```javascript
console.log(this); // window (in browser) or global (in Node.js)
```

### 2. Function Context (Default)
```javascript
function regularFunction() {
  console.log(this); // window (in non-strict mode) or undefined (in strict mode)
}
regularFunction();
```

### 3. Method Context
```javascript
const obj = {
  name: "John",
  greet: function() {
    console.log(this.name); // "John" - this refers to obj
  }
};
obj.greet();
```

### 4. Constructor Context
```javascript
function Person(name) {
  this.name = name; // this refers to the new instance
}

const person = new Person("John");
console.log(person.name); // "John"
```

### 5. Arrow Functions
```javascript
const obj = {
  name: "John",
  regular: function() {
    console.log(this.name); // "John"
  },
  arrow: () => {
    console.log(this.name); // undefined (this refers to outer scope)
  }
};
obj.regular();
obj.arrow();
```

## Call Stack

The **Call Stack** is a data structure that tracks function calls. When a function is called, its execution context is pushed onto the stack. When it returns, it's popped off.

```javascript
function first() {
  console.log("First");
  second();
}

function second() {
  console.log("Second");
  third();
}

function third() {
  console.log("Third");
}

first();
```

**Call Stack:**
```
[third]      ← Top of stack
[second]
[first]
[GEC]        ← Bottom of stack
```

## Key Concepts

### 1. Lexical Scoping
JavaScript uses **lexical scoping** (static scoping), meaning the scope is determined by where the code is written, not where it's called.

```javascript
var x = "global";

function outer() {
  var x = "outer";
  
  function inner() {
    console.log(x); // "outer" (from lexical scope, not global)
  }
  
  inner();
}

outer();
```

### 2. Closure and Execution Context
Closures are created because of execution contexts. When a function is defined, it captures its lexical environment (execution context).

```javascript
function outer() {
  var outerVar = "I'm outer";
  
  function inner() {
    console.log(outerVar); // Accesses outerVar from outer's execution context
  }
  
  return inner;
}

const closure = outer();
closure(); // Still has access to outerVar
```

## Key Takeaways

1. **Two types**: Global Execution Context and Function Execution Context
2. **Two phases**: Creation Phase (hoisting) and Execution Phase
3. **Scope Chain**: Determines variable access through outer environments
4. **Call Stack**: Tracks function execution order
5. **`this` binding**: Determined by how function is called
6. **Lexical Scoping**: Scope determined by code location, not call location
7. **Closures**: Created because functions remember their execution context

## Reference
For more detailed explanation, refer to: https://www.freecodecamp.org/news/execution-context-how-javascript-works-behind-the-scenes/

