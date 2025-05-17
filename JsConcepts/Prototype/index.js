/**
 * JavaScript Prototypes Explained
 *
 * Prototypes are the mechanism by which JavaScript objects inherit features from one another.
 * Every object in JavaScript has a built-in property called its prototype.
 */

// Example 1: Basic Prototype Inheritance
const animal = {
  makeSound() {
    return "Some sound";
  },
};

const dog = Object.create(animal);
dog.makeSound = function () {
  return "Woof!";
};

console.log(dog.makeSound()); // "Woof!"
console.log(Object.getPrototypeOf(dog) === animal); // true

// Example 2: Prototype Chain
const mammal = {
  isWarmBlooded: true,
};

const dog2 = Object.create(mammal);
dog2.legs = 4;

console.log(dog2.isWarmBlooded); // true (inherited from mammal)
console.log(dog2.legs); // 4 (own property)

// Example 3: Constructor Functions and Prototypes
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.start = function () {
  return `${this.type} is starting`;
};

const car = new Vehicle("Car");
console.log(car.start()); // "Car is starting"
console.log(car.__proto__ === Vehicle.prototype); // true

// Example 4: Class-based Prototype Inheritance
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

// Example 5: Checking Properties
const person = {
  name: "John",
  age: 30,
};

// Adding a property to the prototype
Object.getPrototypeOf(person).country = "USA";

console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("country")); // false
console.log("country" in person); // true

// Example 6: Modifying Prototypes
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, I'm ${this.name}`;
};

const john = new Person("John");
console.log(john.greet()); // "Hello, I'm John"

// Example 7: Prototype vs __proto__
function Car(model) {
  this.model = model;
}

const tesla = new Car("Model 3");

console.log(Car.prototype); // Contains constructor and prototype methods
console.log(tesla.__proto__); // Points to Car.prototype
console.log(tesla.__proto__ === Car.prototype); // true

/**
 * Key Points:
 * 1. __proto__ is the actual object used in the lookup chain
 * 2. prototype is the object used to build __proto__ when using new
 * 3. Object.create() creates a new object with the specified prototype
 * 4. hasOwnProperty() checks only own properties, not prototype chain
 * 5. The 'in' operator checks both own and prototype properties
 */
// console.log(sample.hasOwnProperty("city"));

//it prints true as it searches the property in the object as well as prototype
// console.log("name" in sample);
