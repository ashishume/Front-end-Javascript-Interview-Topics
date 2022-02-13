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

console.log(newFunc.prototype.getName());
//********************************************************** */

// to find the properties form an object

const sample = {
  name: "Ashish",
  age: 24,
};

sample.__proto__.city = "Coochbehar";

//it prints true as it finds the property in the object
console.log(sample.hasOwnProperty("name"));

/**
 * it prints false as it doesnt finds the property in the object directly
 * as hasOwnProperty does not take prototype into consideration
 */
console.log(sample.hasOwnProperty("city"));

//it prints true as it searches the property in the object as well as prototype
console.log("name" in sample);
