class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} eat food.`);
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    // super(name);
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

const obj=new Dog('dog')

obj.eat()
