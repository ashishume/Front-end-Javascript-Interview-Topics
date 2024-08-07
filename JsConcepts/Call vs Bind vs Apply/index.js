/** call vs bind vs apply */

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

var applyMethod = randomFunc.apply(obj1, ["Rahul", "Diya"]); //apply calls the method only arguments needs to passed as array

var callMethod = randomFunc.call(obj2, "aa", "Raahul"); //call, calls the method on whichever method is being used

var bindMethod = randomFunc.bind(obj1, "Amy", "Ayush"); //bind returns a copy of the function

// console.log(applyMethod);
// console.log(callMethod);
// console.log(bindMethod());  //bind still needs to call the function separetly with () braces

const z = new sample("Ashish");
// console.log(z);
