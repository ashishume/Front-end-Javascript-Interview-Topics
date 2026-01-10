# Symbols in JavaScript

## Overview
Symbols are unique and immutable primitive values introduced in ES6. They are primarily used as unique property keys for objects, helping avoid naming collisions and enabling private-like properties.

## Creating Symbols

```javascript
// Unique symbol
const sym1 = Symbol();
const sym2 = Symbol();
console.log(sym1 === sym2); // false

// Symbol with description
const sym3 = Symbol("description");
const sym4 = Symbol("description");
console.log(sym3 === sym4); // false (still unique)
```

## Using Symbols as Property Keys

```javascript
const userId = Symbol("userId");
const user = {
  name: "John",
  age: 30,
  [userId]: 12345
};

console.log(user[userId]); // 12345
console.log(user.userId); // undefined
```

## Private Properties Pattern

```javascript
const privateMethod = Symbol("privateMethod");

class MyClass {
  constructor() {
    this[privateMethod] = () => {
      console.log("This is a private method");
    };
  }

  publicMethod() {
    this[privateMethod]();
  }
}

const instance = new MyClass();
instance.publicMethod(); // "This is a private method"
// instance[privateMethod](); // Error - not accessible
```

## Symbol Properties Are Hidden

```javascript
const obj = {
  name: "John",
  [Symbol("id")]: 123
};

console.log(Object.keys(obj)); // ["name"]
console.log(Object.getOwnPropertyNames(obj)); // ["name"]
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(id)]

// Symbols are ignored by:
// - Object.keys()
// - for...in loops
// - JSON.stringify()
```

## Well-Known Symbols

JavaScript provides built-in symbols for customizing object behavior:

- `Symbol.iterator` - Makes objects iterable
- `Symbol.toStringTag` - Customizes Object.prototype.toString()
- `Symbol.toPrimitive` - Controls type coercion

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 42;
    if (hint === "string") return "forty-two";
    return true;
  }
};

console.log(+obj); // 42
console.log(String(obj)); // "forty-two"
```

## Key Points
- Symbols are always unique, even with the same description
- Useful for creating private-like properties
- Hidden from normal iteration and serialization
- Used extensively in JavaScript internals (well-known symbols)

