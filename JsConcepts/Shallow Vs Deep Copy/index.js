/*
Refer for more
 https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
*/
const person = {
  firstName: "John",
  lastName: "Doe",
  address: {
    city: "Coochbehar",
    state: "West Bengal",
    country: "India",
  },
};
// using spread ...
let p1 = {
  ...person,
};
// using  Object.assign() method
let copiedData = Object.assign({}, person);
// console.log(p2);
// using JSON
let p3 = JSON.parse(JSON.stringify(person));
// console.log(p3);

//Both spread (...) and Object.assign() perform a shallow copy while the JSON methods carry a deep copy.

/*
Deep copy vs shallow copy

A deep copying means that value of the new variable is disconnected from the original 
variable 

 Shallow copy means that "some" values are still connected to the original variable.
 in other words: in shallow copy nested objects are still connected;

*/

// one more key difference why cloneDeep is superior over JSON.parse(JSON.stringify(object)) is that
// it handles circular references or non-JSON-serializable values like functions or undefined.

copiedData.address.state = "Karnataka"; //original gets modified because of shallow copy

const animal = {
  name: "Dog",
};
person.__proto__ = animal;

// console.log(person);
