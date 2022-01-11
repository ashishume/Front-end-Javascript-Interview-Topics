const obj1 = {
  name: "Ashish",
  age: 1,
};
const obj2 = {
  name: "Akash",
  age: 2,
};

//obj passed through apply is called using this (here Ashish and age is called)
function randomFunc(x, y) {
  // console.log(x);
  // console.log(y);
  return `<div>
             My name is ${this.name} and and friend is ${x} and ${y}
          </div>`;
}

var a = randomFunc.apply(obj1, ["Rahul", "Diya"]); //apply calls the method only arguments needs to passed as array

var b = randomFunc.call(obj2, "aa", "Raahul"); //call, calls the method on whichever method is being used

var c = randomFunc.bind(obj1, "Amy", "Ayush"); //bind returns a copy of the function (other things is similar to call)
//bind creates a new function
// console.log(a);
// console.log(b);
// console.log(c());

function sample(x) {
  //when used arrow function x will not work because new opertor  doesnt work in arrow
  // console.log(x);
}

const z = new sample("Ashish");
// console.log(z);
