/**
 Symbols in JavaScript are unique and immutable data types that can be used as property keys for object properties. They were introduced in ECMAScript 6 (ES6) to provide a way to create unique identifiers that avoid naming collisions.
 */

const privateMethod = Symbol("privateMethod");

class MyClass {
  constructor() {
    this[privateMethod] = () => {
      console.log("This is a private method");
    };
  }

  publicMethod() {
    this[privateMethod]();
  }
}

const instance = new MyClass();
instance.publicMethod(); // This calls the private method
// instance[privateMethod](); // This would throw an error because the private method is inaccessible from outside the class
// --------------------------------------------------------------------------------------
// add metadata to an object without the risk of accidental name collisions
const user = {
  name: "John",
  age: 30,
};

const userId = Symbol("userId");
user[userId] = 12345;

console.log(user); // { name: 'John', age: 30, [Symbol(userId)]: 12345 }

//Symbols are ignored by methods like Object.keys(), for...in loops, and JSON.stringify(), making them useful when you want to define object properties that are not iterated over by default