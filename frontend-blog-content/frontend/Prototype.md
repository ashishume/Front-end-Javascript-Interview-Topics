# Prototype in JavaScript

## Overview
**Prototypes** are the mechanism by which JavaScript objects inherit features from one another. Every object in JavaScript has a built-in property called its **prototype**.

## Key Concepts

### Prototype Chain
JavaScript uses a **prototype chain** for inheritance. When you try to access a property on an object, JavaScript first looks for it on the object itself. If not found, it looks up the prototype chain.

### `__proto__` vs `prototype`

- **`__proto__`**: The actual object used in the lookup chain (the prototype of an instance)
- **`prototype`**: The object used to build `__proto__` when using `new` (only exists on functions)

## Basic Prototype Inheritance

### Example 1: Object.create()

```javascript
const animal = {
  makeSound() {
    return "Some sound";
  },
};

const dog = Object.create(animal);
dog.makeSound = function () {
  return "Woof!";
};

console.log(dog.makeSound()); // "Woof!" (own method)
console.log(Object.getPrototypeOf(dog) === animal); // true
```

### Example 2: Prototype Chain

```javascript
const mammal = {
  isWarmBlooded: true,
};

const dog2 = Object.create(mammal);
dog2.legs = 4;

console.log(dog2.isWarmBlooded); // true (inherited from mammal)
console.log(dog2.legs); // 4 (own property)
```

## Constructor Functions and Prototypes

### Example 3: Constructor Function

```javascript
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.start = function () {
  return `${this.type} is starting`;
};

const car = new Vehicle("Car");
console.log(car.start()); // "Car is starting"
console.log(car.__proto__ === Vehicle.prototype); // true
```

**What happens with `new`:**
1. Creates a new empty object
2. Sets `this` to point to the new object
3. Sets the new object's `__proto__` to the constructor's `prototype`
4. Returns the new object (unless constructor returns something else)

### Example 4: Prototype vs __proto__

```javascript
function Car(model) {
  this.model = model;
}

const tesla = new Car("Model 3");

console.log(Car.prototype); // Contains constructor and prototype methods
console.log(tesla.__proto__); // Points to Car.prototype
console.log(tesla.__proto__ === Car.prototype); // true
```

**Key Points:**
- `Car.prototype` is the prototype object for instances created with `new Car()`
- `tesla.__proto__` points to `Car.prototype`
- `__proto__` is the actual object used in the lookup chain
- `prototype` is the object used to build `__proto__` when using `new`

## Class-based Prototype Inheritance

### Example 5: ES6 Classes

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}

const rex = new Dog("Rex");
console.log(rex.speak()); // "Rex barks"
console.log(rex instanceof Animal); // true
console.log(rex instanceof Dog); // true
```

**Note:** ES6 classes are syntactic sugar over prototype-based inheritance.

## Checking Properties

### Example 6: hasOwnProperty vs 'in' operator

```javascript
const person = {
  name: "John",
  age: 30,
};

// Adding a property to the prototype
Object.getPrototypeOf(person).country = "USA";

console.log(person.hasOwnProperty("name")); // true (own property)
console.log(person.hasOwnProperty("country")); // false (inherited)
console.log("country" in person); // true (checks prototype chain)
```

**Differences:**
- `hasOwnProperty()`: Checks only own properties, not prototype chain
- `in` operator: Checks both own and prototype properties

## Modifying Prototypes

### Example 7: Adding Methods to Prototype

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, I'm ${this.name}`;
};

const john = new Person("John");
console.log(john.greet()); // "Hello, I'm John"

// All instances share the same prototype method
const jane = new Person("Jane");
console.log(jane.greet()); // "Hello, I'm Jane"
```

## Prototype Chain Example

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  return `${this.name} is eating`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

Dog.prototype.bark = function() {
  return `${this.name} is barking`;
};

const buddy = new Dog("Buddy", "Golden Retriever");

console.log(buddy.bark()); // "Buddy is barking" (own method)
console.log(buddy.eat()); // "Buddy is eating" (inherited from Animal)
console.log(buddy.name); // "Buddy" (own property)
```

**Prototype Chain:**
```
buddy → Dog.prototype → Animal.prototype → Object.prototype → null
```

## Common Patterns

### 1. Prototype Methods vs Instance Methods

```javascript
function Calculator() {
  // Instance method (each instance has its own copy)
  this.add = function(a, b) {
    return a + b;
  };
}

// Prototype method (shared across all instances)
Calculator.prototype.multiply = function(a, b) {
  return a * b;
};

const calc1 = new Calculator();
const calc2 = new Calculator();

console.log(calc1.add === calc2.add); // false (different functions)
console.log(calc1.multiply === calc2.multiply); // true (same function)
```

### 2. Extending Built-in Objects (Not Recommended)

```javascript
// Not recommended, but possible
Array.prototype.last = function() {
  return this[this.length - 1];
};

const arr = [1, 2, 3];
console.log(arr.last()); // 3
```

## Key Takeaways

1. **Every object has a prototype** (except `Object.prototype`)
2. **`__proto__`** is the actual object used in lookup chain
3. **`prototype`** is the object used to build `__proto__` when using `new`
4. **`Object.create()`** creates a new object with specified prototype
5. **`hasOwnProperty()`** checks only own properties
6. **`in` operator** checks both own and prototype properties
7. **Prototype chain** allows inheritance and property lookup
8. **ES6 classes** are syntactic sugar over prototype-based inheritance

## Important Notes

- Modifying prototypes affects all instances (be careful!)
- Prototype chain lookup can impact performance (deep chains)
- Use `Object.create()` for clean prototype inheritance
- Always set `constructor` property when setting up inheritance manually
- Prefer ES6 classes for better readability and maintainability

