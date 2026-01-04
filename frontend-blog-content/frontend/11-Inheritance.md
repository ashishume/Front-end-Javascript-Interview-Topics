# Inheritance in JavaScript

## Overview
**Inheritance** is a mechanism that allows one class to inherit properties and methods from another class. In JavaScript, inheritance can be achieved through various methods, with ES6 classes being the most modern approach.

## Types of Inheritance in JavaScript

1. **Prototype-based Inheritance** (Traditional)
2. **Class-based Inheritance** (ES6)
3. **Mixins and Composition**

## ES6 Class Inheritance

### Basic Inheritance

```javascript
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.health = 100;
    this.energy = 100;
  }

  eat() {
    this.energy += 10;
    console.log(`${this.name} is eating. Energy: ${this.energy}`);
  }

  sleep() {
    this.health += 10;
    console.log(`${this.name} is sleeping. Health: ${this.health}`);
  }

  makeSound() {
    console.log(`${this.name} makes a generic sound.`);
  }
}
```

### Extending Classes

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Canis"); // Call parent constructor
    this.breed = breed;
    this.loyalty = 0;
  }

  bark() {
    console.log(`${this.name} barks: Woof! Woof!`);
  }

  play() {
    this.loyalty += 5;
    this.energy -= 10;
    console.log(`${this.name} is playing. Loyalty: ${this.loyalty}`);
  }

  // Method overriding
  makeSound() {
    this.bark(); // Override parent method
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super(name, "Felis"); // Call parent constructor
    this.color = color;
    this.independence = 100;
  }

  meow() {
    console.log(`${this.name} meows: Meow! Meow!`);
  }

  hunt() {
    this.independence += 5;
    this.energy -= 15;
    console.log(`${this.name} is hunting. Independence: ${this.independence}`);
  }

  // Method overriding
  makeSound() {
    this.meow(); // Override parent method
  }
}
```

### Usage Example

```javascript
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Orange");

console.log("Dog Example:");
dog.eat();        // Inherited method
dog.sleep();      // Inherited method
dog.bark();       // Dog-specific method
dog.play();       // Dog-specific method
dog.makeSound();  // Overridden method

console.log("\nCat Example:");
cat.eat();        // Inherited method
cat.sleep();      // Inherited method
cat.meow();       // Cat-specific method
cat.hunt();       // Cat-specific method
cat.makeSound();  // Overridden method

// Inheritance check
console.log("\nInheritance Check:");
console.log(dog instanceof Animal); // true
console.log(cat instanceof Animal); // true
console.log(dog instanceof Dog);    // true
```

## The `super` Keyword

### Using `super` in Constructor

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // Must call super() before using 'this'
    this.age = age;
  }
}
```

### Using `super` to Call Parent Methods

```javascript
class Animal {
  makeSound() {
    console.log("Some generic sound");
  }
}

class Dog extends Animal {
  makeSound() {
    super.makeSound(); // Call parent method
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.makeSound();
// Output:
// "Some generic sound"
// "Woof! Woof!"
```

## Prototype-based Inheritance (Traditional)

### Constructor Function Inheritance

```javascript
// Parent constructor
function Animal(name, species) {
  this.name = name;
  this.species = species;
  this.health = 100;
}

Animal.prototype.eat = function() {
  this.health += 10;
  console.log(`${this.name} is eating`);
};

// Child constructor
function Dog(name, breed) {
  Animal.call(this, name, "Canis"); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

// Add child-specific methods
Dog.prototype.bark = function() {
  console.log(`${this.name} barks: Woof!`);
};

const dog = new Dog("Buddy", "Golden Retriever");
dog.eat();  // Inherited method
dog.bark(); // Own method
```

## Multiple Levels of Inheritance

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  breathe() {
    console.log(`${this.name} is breathing`);
  }
}

class Mammal extends Animal {
  constructor(name, isWarmBlooded = true) {
    super(name);
    this.isWarmBlooded = isWarmBlooded;
  }
  
  feedMilk() {
    console.log(`${this.name} is feeding milk`);
  }
}

class Dog extends Mammal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} is barking`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.breathe();   // From Animal
dog.feedMilk();  // From Mammal
dog.bark();      // From Dog
```

## Method Overriding

```javascript
class Shape {
  area() {
    return 0;
  }
  
  perimeter() {
    return 0;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  // Override parent method
  area() {
    return this.width * this.height;
  }
  
  // Override parent method
  perimeter() {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  // Override parent method
  area() {
    return Math.PI * this.radius * this.radius;
  }
  
  // Override parent method
  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.area());      // 50
console.log(rect.perimeter()); // 30

const circle = new Circle(5);
console.log(circle.area());      // ~78.54
console.log(circle.perimeter()); // ~31.42
```

## Static Methods and Inheritance

```javascript
class Animal {
  static getKingdom() {
    return "Animalia";
  }
  
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  static getKingdom() {
    return super.getKingdom() + " - Canine";
  }
}

console.log(Animal.getKingdom()); // "Animalia"
console.log(Dog.getKingdom());    // "Animalia - Canine"
```

## Private Fields and Inheritance

```javascript
class Animal {
  #name; // Private field
  
  constructor(name) {
    this.#name = name;
  }
  
  getName() {
    return this.#name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  // Can access parent's private field through methods
  introduce() {
    return `${this.getName()} is a ${this.breed}`;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.introduce()); // "Buddy is a Golden Retriever"
// console.log(dog.#name); // SyntaxError: Private field
```

## Composition vs Inheritance

Sometimes **composition** (has-a relationship) is better than **inheritance** (is-a relationship).

### Inheritance Example
```javascript
class Car extends Vehicle {
  // Car IS-A Vehicle
}
```

### Composition Example
```javascript
class Car {
  constructor() {
    this.engine = new Engine(); // Car HAS-A Engine
    this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }
}
```

## Best Practices

1. **Use `super()`** before accessing `this` in child constructors
2. **Call parent constructors** to initialize parent properties
3. **Fix constructor reference** when using prototype inheritance
4. **Prefer composition over inheritance** when possible
5. **Use ES6 classes** for better readability
6. **Override methods** when child needs different behavior
7. **Use `instanceof`** to check inheritance relationships

## Key Takeaways

1. **Inheritance** allows classes to inherit properties and methods from parent classes
2. **`extends` keyword** is used to create inheritance in ES6 classes
3. **`super()`** must be called in child constructor before using `this`
4. **`super.method()`** can call parent methods from child methods
5. **Method overriding** allows child classes to provide their own implementation
6. **`instanceof`** checks if an object is an instance of a class
7. **Prototype chain** is how inheritance works under the hood
8. **Composition** is sometimes preferable to inheritance

