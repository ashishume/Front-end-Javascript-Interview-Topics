// Polyfill for inheritance using prototype chain
function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

// Example usage:
// Parent constructor function
function Animal(name) {
  this.name = name;
}

// Method defined on the parent prototype
Animal.prototype.makeSound = function () {
  console.log(`${this.name} makes a sound`);
};

// Child constructor function
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Inherit from Animal
inherit(Dog, Animal);

// Method specific to Dog
Dog.prototype.bark = function () {
  console.log(`${this.name} barks`);
};

// Creating an instance of Dog
const myDog = new Dog("Buddy", "Golden Retriever");

// Calling methods
myDog.makeSound(); // Output: Buddy makes a sound
myDog.bark(); // Output: Buddy barks
