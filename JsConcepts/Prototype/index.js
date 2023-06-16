// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes

const human = {
  age: 12,
};

const another = Object.create(human);
// another.age = 15;

// console.log(another.age); // human object will be inside [[Prototype]]
/** technically if age is consoled, then first it will try to find in the main object, if not found
 * then it will keep searching inside prototype object, when found it prints,
 * else it prints undefined
 */

/** Example of prototype using class */

class Human {
  constructor() {}
  getAge() {
    return "21";
  }
}
class Student extends Human {
  constructor() {
    super();
  }
  getAge() {
    return "30";
  }
}

const h = new Student();
// console.log(h); //prints the base(human) class in the [[Prototype]] object

// ---------------------------------------------------------------------------------------

function Person() {
  //function
  this.name = "Ashish";
}

const person = new Person(); //constructor functions

console.log(person.__proto__); //undefined, it should be __proto__
console.log(Person.prototype); //prints constructor of function
console.log(person.__proto__ === Person.prototype);

console.log(Object.getPrototypeOf({ a: "Ashish" }));
/**
 * __proto__ is the actual object that is used in the lookup chain to
 * resolve methods, etc. prototype is the object that is used to build __proto__
 * when you create an object with new:
 */

/** Other definition:
 * __proto__ is a property of every object/method/array thats pointing to the parent object
 * that its inheriting from.
 * Prototype is a property on the constructor function that contains all the stuff that will
 * be inhertited by its instance.
 */

// ---------------------------------------------
/** Object created using object literal, then we are accessing the object prototype
 * using __proto__ and adding new properties to the object
 *
 */
const obj = {
  name: "Ashish",
  age: 24,
  city: "WB",
};

obj.__proto__.setName = (name) => {
  this.name = name;
};
obj.__proto__.getName = () => {
  return this.name;
};

obj.__proto__.setName("Akash");
const a = obj.__proto__.getName();
// console.log(obj, a);

function newFunc(name) {
  this.name = name;
}

/** prototype is used when it is directly accessed and __proto__ is
 * accessed via the instance created from the object or function
 * */

const obj2 = new newFunc("Rahul");

newFunc.prototype.setName = (name) => {
  this.name = name;
};
newFunc.prototype.getName = () => {
  return this.name;
};

newFunc.prototype.setName("Soro");

// console.log(newFunc.prototype.getName());
//********************************************************** */

// to find the properties form an object

const sample = {
  name: "Ashish",
  age: 24,
};

sample.__proto__.city = "Coochbehar";

//it prints true as it finds the property in the object
// console.log(sample.hasOwnProperty("name"));

/**
 * it prints false as it doesnt finds the property in the object directly
 * as hasOwnProperty does not take prototype into consideration
 */
// console.log(sample.hasOwnProperty("city"));

//it prints true as it searches the property in the object as well as prototype
// console.log("name" in sample);
