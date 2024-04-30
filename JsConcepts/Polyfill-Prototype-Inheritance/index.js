// Polyfill for prototype inheritance
if (!Object.create) {
  Object.create = function (proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  };
}

// Example usage
// Parent class
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayName = function () {
  console.log("My name is " + this.name);
};

// Child class inheriting from Animal
function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);   // created a new object with the properties of base class
Dog.prototype.constructor = Dog;       

Dog.prototype.bark = function () {   // method added in child class
  console.log("Woof! I am a " + this.breed);
};

// Creating instances
var dog1 = new Dog("Max", "Labrador");
dog1.sayName();//(method from base class)  // Output: My name is Max
dog1.bark(); //(method from child class)  // Output: Woof! I am a Labrador
