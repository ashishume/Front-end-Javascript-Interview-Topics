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

// var a = randomFunc.apply(obj1, ["Rahul", "Diya"]); //x and y contains the array args e.g. Rahul and Diya

// var b = randomFunc.call(obj2, "aa", "Raahul"); //passed call as comma seprated args

var c = randomFunc.bind(obj1,"Amy", "Ayush"); //passed the object context and can be accessed using this keyword
//bind creates a new function
console.log(c()); //passed the args using comma and called

function sample(x) {
  //when used arrow function x will not work because new opertor  doesnt work in arrow
  console.log(x);
}

const z = new sample("Ashish");
// console.log(z);
