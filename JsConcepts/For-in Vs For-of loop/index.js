//ONLY FOR ARRAYS
function forOfLoop(arr) {
  /**
   * val ==> value of each item
   * arr ==> whole array
   *
   * Note: object cannot be iterated via for of Loop
   */
  for (let val of arr) {
    console.log(val);
  }
}

//CAN BE USED IN BOTH ARRAY AND OBJECT
function forInLoop(arr) {
  /**
   * key ==> index/key property of item
   * arr ==> whole array/object
   */
  for (let key in arr) {
    console.log(`${key} =>`, arr[key]);
  }
}

const arr = [5, 9, 1, 2, 3];
const obj = {
  a: 1,
  b: 2,
  c: "String",
};

// forInLoop(obj);

// for (let [key, value] of Object.entries(obj)) {
//   console.log(key);
//   console.log(value);
// }

// console.log(Object.entries(obj));
/**
  [
   ["a", 1],
   ["b", 2],
   ["c", "String"],
  ];
  */
