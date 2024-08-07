/**
 * The Multitone pattern is a design pattern that extends the Singleton pattern to allow for
 * the creation of a controlled number of instances. While the Singleton pattern restricts the
 * instantiation of a class to one single instance, the Multitone pattern allows a fixed,
 * predefined number of instances.
 *
 * Key is being used to differentiate among the patterns. if key is same then both instances are equal
 */

class Multitone {
  constructor(name) {
    this.name = name;
  }

  static getInstance(key) {
    if (!Multitone.instances) {
      Multitone.instances = {};
    }

    if (!Multitone.instances[key]) {
      Multitone.instances[key] = new Multitone(key);
    }

    return Multitone.instances[key];
  }

  getName() {
    return this.name;
  }
}

// Usage
const instance1 = Multitone.getInstance("first");
console.log(instance1.getName()); // Output: first

const instance2 = Multitone.getInstance("second");
console.log(instance2.getName()); // Output: second

const anotherInstance1 = Multitone.getInstance("first");
console.log(anotherInstance1.getName()); // Output: first
console.log(instance1 === anotherInstance1); // Output: true
