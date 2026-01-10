# Proxy in JavaScript

## Overview
The `Proxy` object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object. It acts as an observer, allowing you to monitor and control property access, assignment, and other operations.

## Basic Syntax

```javascript
const target = { name: "John" };
const handler = {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);
```

## Common Use Cases

### Property Access Tracking

```javascript
const person = {
  firstName: "Prashant",
};

const handler = {
  set(target, prop, value) {
    console.log(`${prop} is changed from ${target[prop]} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const proxyPerson = new Proxy(person, handler);

proxyPerson.firstName = "Prashant 2";
// "firstName is changed from Prashant to Prashant 2"

proxyPerson.blog = "Learnersbucket";
// "blog is changed from undefined to Learnersbucket"
```

### Validation

```javascript
const validator = {
  set(target, prop, value) {
    if (prop === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    if (prop === "age" && value < 0) {
      throw new RangeError("Age cannot be negative");
    }
    target[prop] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 25; // OK
// person.age = "25"; // TypeError
```

## Proxy Traps

Common traps you can intercept:
- `get(target, prop, receiver)` - Property access
- `set(target, prop, value, receiver)` - Property assignment
- `has(target, prop)` - `in` operator
- `deleteProperty(target, prop)` - `delete` operator
- `ownKeys(target)` - `Object.keys()`, `Object.getOwnPropertyNames()`
- `apply(target, thisArg, argumentsList)` - Function calls

## Key Points
- Proxies allow you to intercept and customize operations on objects
- Useful for validation, logging, and creating reactive systems
- Can be used to implement features like negative array indices
- Performance overhead compared to direct property access

