# Hoisting in JavaScript

## Overview
Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase, before code execution.

## Important Note
Hoisting is a **compile-time behavior**. The actual code doesn't move, but JavaScript processes declarations before execution.

## Variable Hoisting

### var Hoisting
- Variables declared with `var` are hoisted to the top of their scope
- They are initialized with `undefined`
- Can be accessed before declaration (returns `undefined`)

```javascript
console.log(a); // undefined (not ReferenceError)
a = "Ashish";
var a;
console.log(a); // "Ashish"
```

**What happens:**
```javascript
// JavaScript interprets it as:
var a; // hoisted and initialized with undefined
console.log(a); // undefined
a = "Ashish";
console.log(a); // "Ashish"
```

### let and const Hoisting
- `let` and `const` are hoisted but **not initialized**
- Cannot be accessed before declaration
- Results in `ReferenceError: Cannot access 'variable' before initialization`
- This is called the **Temporal Dead Zone (TDZ)**

```javascript
// This will throw ReferenceError
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = "Dev";
```

```javascript
// This will also throw ReferenceError
console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 10;
```

## Function Hoisting

### Function Declarations
- Fully hoisted (both declaration and definition)
- Can be called before declaration

```javascript
console.log(func()); // 10 (works!)

function func() {
  return 10;
}
```

### Function Expressions
- Follow variable hoisting rules
- Cannot be called before declaration
- If using `var`, the variable is hoisted but initialized as `undefined`

```javascript
// This will throw TypeError
console.log(func()); // TypeError: func is not a function

var func = function () {
  return 10;
};
```

**What happens:**
```javascript
// JavaScript interprets it as:
var func; // hoisted, initialized as undefined
console.log(func()); // TypeError: func is undefined, not a function
func = function () {
  return 10;
};
```

### Arrow Functions
- Follow the same rules as function expressions
- Cannot be called before declaration

```javascript
// This will throw ReferenceError (if using let/const)
console.log(arrowFunc()); // ReferenceError

const arrowFunc = () => {
  return 10;
};
```

## Hoisting Priority

1. **Function declarations** are hoisted first
2. **Variable declarations** are hoisted second
3. **Function expressions** follow variable hoisting rules

```javascript
console.log(typeof func); // "function" (function declaration wins)

var func = "I'm a string";

function func() {
  return "I'm a function";
}

console.log(typeof func); // "string" (variable assignment happens)
```

## Examples

### Example 1: var Hoisting
```javascript
console.log(a); // undefined
a = "Ashish";
var a;
```

### Example 2: Function Expression Hoisting
```javascript
console.log(func()); // TypeError: func is not a function
const func = function () {
  return 10;
};
```

### Example 3: let Hoisting (Temporal Dead Zone)
```javascript
b = "Dev"; // ReferenceError: Cannot access 'b' before initialization
let b;
```

## Best Practices

1. **Always declare variables at the top of their scope**
2. **Use `let` and `const` instead of `var`** to avoid unexpected behavior
3. **Declare functions before using them** (or use function declarations)
4. **Be aware of the Temporal Dead Zone** when using `let` and `const`

## Key Takeaways

| Declaration Type | Hoisted? | Initial Value | Can Access Before Declaration? |
|-----------------|----------|---------------|-------------------------------|
| `var` | Yes | `undefined` | Yes (returns `undefined`) |
| `let` | Yes | Not initialized | No (ReferenceError) |
| `const` | Yes | Not initialized | No (ReferenceError) |
| Function Declaration | Yes | Function definition | Yes |
| Function Expression | Depends on variable | `undefined` or ReferenceError | No |
| Arrow Function | Depends on variable | `undefined` or ReferenceError | No |

