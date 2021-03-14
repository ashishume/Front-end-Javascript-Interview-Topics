function abc(x, y, ...args) {
  // rest parameters we were able to get a list of arguments into an array.
  return args;
}

console.log(abc(1, 2, 4, 5, 7));

const obj1 = {
  name: "Ash",
  lName: "Dev",
};

const obj2 = {
  ...obj1, //spread operator
};

const array1 = [1, 2, 5];

const array2 = [...array1, 6, 7];

/*
  Spread operators copies into new array or new object
  */
