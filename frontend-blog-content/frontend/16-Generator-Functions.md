# Generator Functions in JavaScript

## Overview
Generator functions are special functions that can be paused and resumed. They use the `yield` keyword to pause execution and return values incrementally. Generators are particularly useful for handling asynchronous operations and creating iterators.

## Basic Syntax

```javascript
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generatorFunction();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

## Generator Object Methods

```javascript
function* numberGenerator(initialValue) {
  yield initialValue;
  console.log("Processing...");
  yield initialValue + 10;
  yield initialValue + 20;
}

const gen = numberGenerator(10);

// next() - resumes execution
console.log(gen.next()); // { value: 10, done: false }
console.log(gen.next()); // Processing... { value: 20, done: false }

// return() - terminates generator
console.log(gen.return(100)); // { value: 100, done: true }

// throw() - throws error into generator
const gen2 = numberGenerator(5);
gen2.next();
gen2.throw(new Error("Something went wrong"));
```

## Iterating Generators

```javascript
function* stringSequence() {
  yield "First";
  yield "Second";
  yield "Third";
}

// Using for...of
for (let value of stringSequence()) {
  console.log(value);
}
// First
// Second
// Third

// Using spread operator
const values = [...stringSequence()]; // ["First", "Second", "Third"]
```

## Passing Values to Generators

```javascript
function* generator() {
  const x = yield 1;
  const y = yield x + 2;
  yield y + 3;
}

const gen = generator();
console.log(gen.next());    // { value: 1, done: false }
console.log(gen.next(10));   // { value: 12, done: false } (x = 10)
console.log(gen.next(20));   // { value: 23, done: false } (y = 20)
console.log(gen.next());     // { value: undefined, done: true }
```

## Infinite Generators

```javascript
function* infiniteCounter() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

const counter = infiniteCounter();
console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
// ... continues indefinitely
```

## Delegating to Another Generator

```javascript
function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield* generator1();
  yield 3;
  yield 4;
}

for (let value of generator2()) {
  console.log(value);
}
// 1, 2, 3, 4
```

## Use Case: Redux-Saga

Generators are commonly used in Redux-Saga for handling async operations:

```javascript
function* fetchUser(action) {
  try {
    const user = yield call(api.fetchUser, action.userId);
    yield put({ type: "USER_FETCH_SUCCEEDED", user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}
```

## Benefits

1. **Lazy Evaluation**: Values are computed on-demand
2. **Memory Efficient**: Only generates values as needed
3. **Async Control**: Helps solve callback hell and inversion of control
4. **Iterable**: Can be used with for...of loops and spread operator

## Key Points
- Generators use `function*` syntax and `yield` keyword
- They return a generator object with `next()`, `return()`, and `throw()` methods
- Useful for creating iterators and handling async operations
- Values are generated lazily, making them memory efficient

