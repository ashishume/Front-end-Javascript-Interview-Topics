/**

- The Singleton Pattern is a creational design pattern that ensures a class has only 
one instance and provides a global point of access to that instance. 

- It is useful when exactly one object is needed to coordinate actions across the system. 
- The Singleton Pattern involves a single class that is responsible for creating an instance, 
 controlling access to the instance, and ensuring that only a single instance is created.

*/
// Singleton class
class Singleton {
  constructor() {
    // Check if an instance already exists
    if (Singleton.instance) {
      return Singleton.instance;
    }

    // If no instance exists, create a new one
    this.someData = "Singleton instance created";
    Singleton.instance = this;

    // Ensure the constructor returns the instance
    return this;
  }

  // Additional methods or properties can be added here
}

// Example Usage
const singletonInstance1 = new Singleton();
console.log(singletonInstance1.someData); // Output: Singleton instance created

const singletonInstance2 = new Singleton();
console.log(singletonInstance2.someData); // Output: Singleton instance created

console.log(singletonInstance1 === singletonInstance2); // Output: true (both instances are the same)
