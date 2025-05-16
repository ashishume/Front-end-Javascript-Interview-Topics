/** Inheritance example using Animal Kingdom */
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

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Canis");
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

  makeSound() {
    this.bark();
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super(name, "Felis");
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

  makeSound() {
    this.meow();
  }
}

// Example usage:
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Orange");

console.log("Dog Example:");
dog.eat(); // Inherited method
dog.sleep(); // Inherited method
dog.bark(); // Dog-specific method
dog.play(); // Dog-specific method
dog.makeSound(); // Overridden method

console.log("\nCat Example:");
cat.eat(); // Inherited method
cat.sleep(); // Inherited method
cat.meow(); // Cat-specific method
cat.hunt(); // Cat-specific method
cat.makeSound(); // Overridden method

// Demonstrate inheritance
console.log("\nInheritance Check:");
console.log(dog instanceof Animal); // true
console.log(cat instanceof Animal); // true
